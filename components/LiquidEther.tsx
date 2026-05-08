"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LiquidEtherProps {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  colors?: string[];
  style?: React.CSSProperties;
  className?: string;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

export default function LiquidEther({
  mouseForce = 20, cursorSize = 100, isViscous = false, viscous = 30,
  iterationsViscous = 32, iterationsPoisson = 32, dt = 0.014, BFECC = true,
  resolution = 0.5, isBounce = false, colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  style = {}, className = '', autoDemo = true, autoSpeed = 0.5, autoIntensity = 2.2,
  takeoverDuration = 0.25, autoResumeDelay = 1000, autoRampDuration = 0.6,
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const webglRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const isVisibleRef = useRef(true);
  const resizeRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // ─── PALETTE ──────────────────────────────────────────────────────────────
    function makePaletteTexture(stops: string[]) {
      const arr = stops.length === 0 ? ['#fff', '#fff'] : stops.length === 1 ? [stops[0], stops[0]] : stops;
      const data = new Uint8Array(arr.length * 4);
      arr.forEach((s, i) => {
        const c = new THREE.Color(s);
        data[i * 4] = Math.round(c.r * 255); data[i * 4 + 1] = Math.round(c.g * 255);
        data[i * 4 + 2] = Math.round(c.b * 255); data[i * 4 + 3] = 255;
      });
      const tex = new THREE.DataTexture(data, arr.length, 1, THREE.RGBAFormat);
      tex.magFilter = tex.minFilter = THREE.LinearFilter;
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false; tex.needsUpdate = true;
      return tex;
    }
    const paletteTex = makePaletteTexture(colors);
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);

    // ─── SHADERS ──────────────────────────────────────────────────────────────
    const face_vert = `attribute vec3 position;uniform vec2 px;uniform vec2 boundarySpace;varying vec2 uv;precision highp float;void main(){vec3 pos=position;vec2 scale=1.0-boundarySpace*2.0;pos.xy=pos.xy*scale;uv=vec2(0.5)+(pos.xy)*0.5;gl_Position=vec4(pos,1.0);}`;
    const line_vert = `attribute vec3 position;uniform vec2 px;precision highp float;varying vec2 uv;void main(){vec3 pos=position;uv=0.5+pos.xy*0.5;vec2 n=sign(pos.xy);pos.xy=abs(pos.xy)-px*1.0;pos.xy*=n;gl_Position=vec4(pos,1.0);}`;
    const mouse_vert = `precision highp float;attribute vec3 position;attribute vec2 uv;uniform vec2 center;uniform vec2 scale;uniform vec2 px;varying vec2 vUv;void main(){vec2 pos=position.xy*scale*2.0*px+center;vUv=uv;gl_Position=vec4(pos,0.0,1.0);}`;
    const advection_frag = `precision highp float;uniform sampler2D velocity;uniform float dt;uniform bool isBFECC;uniform vec2 fboSize;uniform vec2 px;varying vec2 uv;void main(){vec2 ratio=max(fboSize.x,fboSize.y)/fboSize;if(!isBFECC){vec2 vel=texture2D(velocity,uv).xy;vec2 uv2=uv-vel*dt*ratio;gl_FragColor=vec4(texture2D(velocity,uv2).xy,0.0,0.0);}else{vec2 sn=uv;vec2 vo=texture2D(velocity,uv).xy;vec2 so=sn-vo*dt*ratio;vec2 vn1=texture2D(velocity,so).xy;vec2 sn2=so+vn1*dt*ratio;vec2 err=sn2-sn;vec2 sn3=sn-err/2.0;vec2 v2=texture2D(velocity,sn3).xy;vec2 so2=sn3-v2*dt*ratio;gl_FragColor=vec4(texture2D(velocity,so2).xy,0.0,0.0);}}`;
    const color_frag = `precision highp float;uniform sampler2D velocity;uniform sampler2D palette;uniform vec4 bgColor;varying vec2 uv;void main(){vec2 vel=texture2D(velocity,uv).xy;float lenv=clamp(length(vel),0.0,1.0);vec3 c=texture2D(palette,vec2(lenv,0.5)).rgb;gl_FragColor=vec4(mix(bgColor.rgb,c,lenv),mix(bgColor.a,1.0,lenv));}`;
    const divergence_frag = `precision highp float;uniform sampler2D velocity;uniform float dt;uniform vec2 px;varying vec2 uv;void main(){float x0=texture2D(velocity,uv-vec2(px.x,0.0)).x;float x1=texture2D(velocity,uv+vec2(px.x,0.0)).x;float y0=texture2D(velocity,uv-vec2(0.0,px.y)).y;float y1=texture2D(velocity,uv+vec2(0.0,px.y)).y;gl_FragColor=vec4((x1-x0+y1-y0)/2.0/dt);}`;
    const externalForce_frag = `precision highp float;uniform vec2 force;uniform vec2 center;uniform vec2 scale;uniform vec2 px;varying vec2 vUv;void main(){vec2 c=(vUv-0.5)*2.0;float d=1.0-min(length(c),1.0);d*=d;gl_FragColor=vec4(force*d,0.0,1.0);}`;
    const poisson_frag = `precision highp float;uniform sampler2D pressure;uniform sampler2D divergence;uniform vec2 px;varying vec2 uv;void main(){float p0=texture2D(pressure,uv+vec2(px.x*2.0,0.0)).r;float p1=texture2D(pressure,uv-vec2(px.x*2.0,0.0)).r;float p2=texture2D(pressure,uv+vec2(0.0,px.y*2.0)).r;float p3=texture2D(pressure,uv-vec2(0.0,px.y*2.0)).r;float div=texture2D(divergence,uv).r;gl_FragColor=vec4((p0+p1+p2+p3)/4.0-div);}`;
    const pressure_frag = `precision highp float;uniform sampler2D pressure;uniform sampler2D velocity;uniform vec2 px;uniform float dt;varying vec2 uv;void main(){float p0=texture2D(pressure,uv+vec2(px.x,0.0)).r;float p1=texture2D(pressure,uv-vec2(px.x,0.0)).r;float p2=texture2D(pressure,uv+vec2(0.0,px.y)).r;float p3=texture2D(pressure,uv-vec2(0.0,px.y)).r;vec2 v=texture2D(velocity,uv).xy;gl_FragColor=vec4(v-vec2(p0-p1,p2-p3)*0.5*dt,0.0,1.0);}`;
    const viscous_frag = `precision highp float;uniform sampler2D velocity;uniform sampler2D velocity_new;uniform float v;uniform vec2 px;uniform float dt;varying vec2 uv;void main(){vec2 old=texture2D(velocity,uv).xy;vec2 n0=texture2D(velocity_new,uv+vec2(px.x*2.0,0.0)).xy;vec2 n1=texture2D(velocity_new,uv-vec2(px.x*2.0,0.0)).xy;vec2 n2=texture2D(velocity_new,uv+vec2(0.0,px.y*2.0)).xy;vec2 n3=texture2D(velocity_new,uv-vec2(0.0,px.y*2.0)).xy;vec2 nv=4.0*old+v*dt*(n0+n1+n2+n3);gl_FragColor=vec4(nv/(4.0*(1.0+v*dt)),0.0,0.0);}`;

    // ─── COMMON ───────────────────────────────────────────────────────────────
    const Common = (() => {
      let width = 1, height = 1, pixelRatio = 1;
      let renderer: THREE.WebGLRenderer | null = null;
      let clock: THREE.Clock | null = null;
      let container: HTMLElement | null = null;
      let time = 0, delta = 0;
      return {
        get width() { return width; }, get height() { return height; },
        get renderer() { return renderer; }, get time() { return time; }, get delta() { return delta; },
        init(c: HTMLElement) {
          container = c; pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
          const r = c.getBoundingClientRect();
          width = Math.max(1, Math.floor(r.width)); height = Math.max(1, Math.floor(r.height));
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.autoClear = false;
          renderer.setClearColor(new THREE.Color(0), 0);
          renderer.setPixelRatio(pixelRatio);
          renderer.setSize(width, height);
          renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;';
          clock = new THREE.Clock(); clock.start();
        },
        resize() {
          if (!container) return;
          const r = container.getBoundingClientRect();
          width = Math.max(1, Math.floor(r.width)); height = Math.max(1, Math.floor(r.height));
          renderer?.setSize(width, height, false);
        },
        update() { delta = clock!.getDelta(); time += delta; },
      };
    })();

    // ─── MOUSE ────────────────────────────────────────────────────────────────
    const Mouse = (() => {
      const coords = new THREE.Vector2(), coords_old = new THREE.Vector2(), diff = new THREE.Vector2();
      const takeoverFrom = new THREE.Vector2(), takeoverTo = new THREE.Vector2();
      let container: HTMLElement | null = null, listenerTarget: Window | null = null, docTarget: Document | null = null;
      let timer: number | null = null;
      let isHoverInside = false, hasUserControl = false;
      let isAutoActive = false;
      let takeoverActive = false, takeoverStartTime = 0;
      let _takeoverDuration = 0.25;
      let _autoIntensity = 2.0;
      let onInteract: (() => void) | null = null;

      function isPointInside(cx: number, cy: number) {
        if (!container) return false;
        const r = container.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
      }
      function setCoords(x: number, y: number) {
        if (!container) return;
        if (timer !== null) window.clearTimeout(timer);
        const r = container.getBoundingClientRect();
        if (!r.width || !r.height) return;
        coords.set((x - r.left) / r.width * 2 - 1, -((y - r.top) / r.height * 2 - 1));
        timer = window.setTimeout(() => {}, 100);
      }
      function onMouseMove(e: MouseEvent) {
        isHoverInside = isPointInside(e.clientX, e.clientY);
        if (!isHoverInside) return;
        onInteract?.();
        if (isAutoActive && !hasUserControl && !takeoverActive) {
          const r = container?.getBoundingClientRect();
          if (!r || !r.width) return;
          takeoverFrom.copy(coords);
          takeoverTo.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height * 2 - 1));
          takeoverStartTime = performance.now();
          takeoverActive = true; hasUserControl = true; isAutoActive = false;
          return;
        }
        setCoords(e.clientX, e.clientY); hasUserControl = true;
      }
      function onTouchStart(e: TouchEvent) {
        if (e.touches.length !== 1) return;
        const t = e.touches[0];
        isHoverInside = isPointInside(t.clientX, t.clientY);
        if (!isHoverInside) return;
        onInteract?.(); setCoords(t.clientX, t.clientY); hasUserControl = true;
      }
      function onTouchMove(e: TouchEvent) {
        if (e.touches.length !== 1) return;
        const t = e.touches[0];
        isHoverInside = isPointInside(t.clientX, t.clientY);
        if (!isHoverInside) return;
        onInteract?.(); setCoords(t.clientX, t.clientY);
      }
      function onTouchEnd() { isHoverInside = false; }
      function onDocLeave() { isHoverInside = false; }

      return {
        get coords() { return coords; }, get coords_old() { return coords_old; }, get diff() { return diff; },
        get isHoverInside() { return isHoverInside; }, get isAutoActive() { return isAutoActive; },
        set isAutoActive(v) { isAutoActive = v; },
        get hasUserControl() { return hasUserControl; }, set hasUserControl(v) { hasUserControl = v; },
        get takeoverActive() { return takeoverActive; }, set takeoverActive(v) { takeoverActive = v; },
        get autoIntensity() { return _autoIntensity; }, set autoIntensity(v) { _autoIntensity = v; },
        get takeoverDuration() { return _takeoverDuration; }, set takeoverDuration(v) { _takeoverDuration = v; },
        set onInteract(fn: (() => void) | null) { onInteract = fn; },
        init(c: HTMLElement) {
          container = c; docTarget = c.ownerDocument; listenerTarget = docTarget.defaultView ?? window;
          listenerTarget.addEventListener('mousemove', onMouseMove as any);
          listenerTarget.addEventListener('touchstart', onTouchStart as any, { passive: true });
          listenerTarget.addEventListener('touchmove', onTouchMove as any, { passive: true });
          listenerTarget.addEventListener('touchend', onTouchEnd);
          docTarget.addEventListener('mouseleave', onDocLeave);
        },
        dispose() {
          listenerTarget?.removeEventListener('mousemove', onMouseMove as any);
          listenerTarget?.removeEventListener('touchstart', onTouchStart as any);
          listenerTarget?.removeEventListener('touchmove', onTouchMove as any);
          listenerTarget?.removeEventListener('touchend', onTouchEnd);
          docTarget?.removeEventListener('mouseleave', onDocLeave);
          container = listenerTarget = docTarget = null;
        },
        setNormalized(nx: number, ny: number) { coords.set(nx, ny); },
        update() {
          if (takeoverActive) {
            const t = (performance.now() - takeoverStartTime) / (_takeoverDuration * 1000);
            if (t >= 1) { takeoverActive = false; coords.copy(takeoverTo); coords_old.copy(coords); diff.set(0, 0); }
            else { const k = t * t * (3 - 2 * t); coords.copy(takeoverFrom).lerp(takeoverTo, k); }
          }
          diff.subVectors(coords, coords_old); coords_old.copy(coords);
          if (coords_old.x === 0 && coords_old.y === 0) diff.set(0, 0);
          if (isAutoActive && !takeoverActive) diff.multiplyScalar(_autoIntensity);
        },
      };
    })();

    // ─── AUTO DRIVER ──────────────────────────────────────────────────────────
    class AutoDriver {
      enabled: boolean; speed: number; resumeDelay: number; rampDurationMs: number;
      active = false; current = new THREE.Vector2(); target = new THREE.Vector2();
      lastTime = performance.now(); activationTime = 0; margin = 0.2;
      private _dir = new THREE.Vector2();
      constructor(opts: { enabled: boolean; speed: number; resumeDelay?: number; rampDuration?: number }) {
        this.enabled = opts.enabled; this.speed = opts.speed;
        this.resumeDelay = opts.resumeDelay ?? 3000; this.rampDurationMs = (opts.rampDuration ?? 0) * 1000;
        this.pickNewTarget();
      }
      pickNewTarget() { this.target.set((Math.random() * 2 - 1) * (1 - this.margin), (Math.random() * 2 - 1) * (1 - this.margin)); }
      forceStop() { this.active = false; Mouse.isAutoActive = false; }
      update(lastUserInteraction: number) {
        if (!this.enabled) return;
        const now = performance.now();
        if (now - lastUserInteraction < this.resumeDelay) { if (this.active) this.forceStop(); return; }
        if (Mouse.isHoverInside) { if (this.active) this.forceStop(); return; }
        if (!this.active) { this.active = true; this.current.copy(Mouse.coords); this.lastTime = now; this.activationTime = now; }
        Mouse.isAutoActive = true;
        let dtSec = Math.min((now - this.lastTime) / 1000, 0.2); this.lastTime = now;
        const dist = this._dir.subVectors(this.target, this.current).length();
        if (dist < 0.01) { this.pickNewTarget(); return; }
        this._dir.normalize();
        const ramp = this.rampDurationMs > 0 ? (() => { const t = Math.min(1, (now - this.activationTime) / this.rampDurationMs); return t * t * (3 - 2 * t); })() : 1;
        this.current.addScaledVector(this._dir, Math.min(this.speed * dtSec * ramp, dist));
        Mouse.setNormalized(this.current.x, this.current.y);
      }
    }

    // ─── FBO helper ───────────────────────────────────────────────────────────
    type FBO = THREE.WebGLRenderTarget;
    function makeFBO(w: number, h: number): FBO {
      const type = /(iPad|iPhone|iPod)/i.test(navigator.userAgent) ? THREE.HalfFloatType : THREE.FloatType;
      return new THREE.WebGLRenderTarget(w, h, { type, depthBuffer: false, stencilBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping });
    }

    // ─── SHADER PASS ──────────────────────────────────────────────────────────
    function renderPass(scene: THREE.Scene, camera: THREE.Camera, output: FBO | null) {
      Common.renderer!.setRenderTarget(output); Common.renderer!.render(scene, camera); Common.renderer!.setRenderTarget(null);
    }
    function makeScene(vert: string, frag: string, uniforms: any, extra?: (mat: THREE.RawShaderMaterial, scene: THREE.Scene) => void) {
      const scene = new THREE.Scene(), camera = new THREE.Camera();
      const mat = new THREE.RawShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms });
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
      extra?.(mat, scene);
      return { scene, camera, mat };
    }

    // ─── SIMULATION ───────────────────────────────────────────────────────────
    let fboSize = new THREE.Vector2(), cellScale = new THREE.Vector2(), boundarySpace = new THREE.Vector2();
    let fbos: Record<string, FBO> = {};
    const fboKeys = ['vel_0','vel_1','vel_viscous0','vel_viscous1','div','pressure_0','pressure_1'];

    function calcSize(res: number) {
      const w = Math.max(1, Math.round(res * Common.width)), h = Math.max(1, Math.round(res * Common.height));
      cellScale.set(1 / w, 1 / h); fboSize.set(w, h);
    }
    function createFBOs() { fboKeys.forEach(k => { fbos[k] = makeFBO(fboSize.x, fboSize.y); }); }
    function resizeFBOs() { fboKeys.forEach(k => { fbos[k].setSize(fboSize.x, fboSize.y); }); }

    // Advection
    const advUniforms = { boundarySpace: { value: cellScale }, px: { value: cellScale }, fboSize: { value: fboSize }, velocity: { value: null as any }, dt: { value: dt }, isBFECC: { value: BFECC } };
    let advScene: THREE.Scene, advCamera: THREE.Camera;
    function initAdvection() {
      advScene = new THREE.Scene(); advCamera = new THREE.Camera();
      advScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.RawShaderMaterial({ vertexShader: face_vert, fragmentShader: advection_frag, uniforms: advUniforms })));
      const bg = new THREE.BufferGeometry();
      bg.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]), 3));
      advScene.add(new THREE.LineSegments(bg, new THREE.RawShaderMaterial({ vertexShader: line_vert, fragmentShader: advection_frag, uniforms: advUniforms })));
    }
    function runAdvection(dtV: number, bounce: boolean, bfecc: boolean) {
      advUniforms.velocity.value = fbos.vel_0.texture;
      advUniforms.dt.value = dtV; advUniforms.isBFECC.value = bfecc;
      (advScene.children[1] as THREE.LineSegments).visible = bounce;
      renderPass(advScene, advCamera, fbos.vel_1);
    }

    // External Force
    const forceUniforms = { px: { value: cellScale }, force: { value: new THREE.Vector2() }, center: { value: new THREE.Vector2() }, scale: { value: new THREE.Vector2(cursorSize, cursorSize) } };
    let forceScene: THREE.Scene, forceCamera: THREE.Camera;
    function initForce() {
      forceScene = new THREE.Scene(); forceCamera = new THREE.Camera();
      forceScene.add(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.RawShaderMaterial({ vertexShader: mouse_vert, fragmentShader: externalForce_frag, blending: THREE.AdditiveBlending, depthWrite: false, uniforms: forceUniforms })));
    }
    function runForce(mForce: number, cSize: number) {
      const cs = cellScale;
      const fx = (Mouse.diff.x / 2) * mForce, fy = (Mouse.diff.y / 2) * mForce;
      const cx = cSize * cs.x, cy = cSize * cs.y;
      forceUniforms.force.value.set(fx, fy);
      forceUniforms.center.value.set(Math.min(Math.max(Mouse.coords.x, -1 + cx + cs.x * 2), 1 - cx - cs.x * 2), Math.min(Math.max(Mouse.coords.y, -1 + cy + cs.y * 2), 1 - cy - cs.y * 2));
      forceUniforms.scale.value.set(cSize, cSize);
      renderPass(forceScene, forceCamera, fbos.vel_1);
    }

    // Viscous
    const visUniforms = { boundarySpace: { value: boundarySpace }, velocity: { value: null as any }, velocity_new: { value: null as any }, v: { value: viscous }, px: { value: cellScale }, dt: { value: dt } };
    let visScene: THREE.Scene, visCamera: THREE.Camera;
    function initViscous() { const r = makeScene(face_vert, viscous_frag, visUniforms); visScene = r.scene; visCamera = r.camera; }
    function runViscous(vis: number, iters: number, dtV: number): FBO {
      visUniforms.v.value = vis; visUniforms.velocity.value = fbos.vel_1.texture;
      let fbo_in: FBO, fbo_out = fbos.vel_viscous0;
      for (let i = 0; i < iters; i++) {
        fbo_in = i % 2 === 0 ? fbos.vel_viscous0 : fbos.vel_viscous1;
        fbo_out = i % 2 === 0 ? fbos.vel_viscous1 : fbos.vel_viscous0;
        visUniforms.velocity_new.value = fbo_in.texture; visUniforms.dt.value = dtV;
        renderPass(visScene, visCamera, fbo_out);
      }
      return fbo_out;
    }

    // Divergence
    const divUniforms = { boundarySpace: { value: boundarySpace }, velocity: { value: null as any }, px: { value: cellScale }, dt: { value: dt } };
    let divScene: THREE.Scene, divCamera: THREE.Camera;
    function initDivergence() { const r = makeScene(face_vert, divergence_frag, divUniforms); divScene = r.scene; divCamera = r.camera; }
    function runDivergence(vel: FBO) { divUniforms.velocity.value = vel.texture; renderPass(divScene, divCamera, fbos.div); }

    // Poisson
    const poisUniforms = { boundarySpace: { value: boundarySpace }, pressure: { value: null as any }, divergence: { value: null as any }, px: { value: cellScale } };
    let poisScene: THREE.Scene, poisCamera: THREE.Camera;
    function initPoisson() { const r = makeScene(face_vert, poisson_frag, poisUniforms); poisScene = r.scene; poisCamera = r.camera; }
    function runPoisson(iters: number): FBO {
      poisUniforms.divergence.value = fbos.div.texture;
      let p_in: FBO, p_out = fbos.pressure_0;
      for (let i = 0; i < iters; i++) {
        p_in = i % 2 === 0 ? fbos.pressure_0 : fbos.pressure_1;
        p_out = i % 2 === 0 ? fbos.pressure_1 : fbos.pressure_0;
        poisUniforms.pressure.value = p_in.texture; renderPass(poisScene, poisCamera, p_out);
      }
      return p_out;
    }

    // Pressure
    const presUniforms = { boundarySpace: { value: boundarySpace }, pressure: { value: null as any }, velocity: { value: null as any }, px: { value: cellScale }, dt: { value: dt } };
    let presScene: THREE.Scene, presCamera: THREE.Camera;
    function initPressure() { const r = makeScene(face_vert, pressure_frag, presUniforms); presScene = r.scene; presCamera = r.camera; }
    function runPressure(vel: FBO, pressure: FBO) {
      presUniforms.velocity.value = vel.texture; presUniforms.pressure.value = pressure.texture;
      renderPass(presScene, presCamera, fbos.vel_0);
    }

    // Output scene
    const outUniforms = { velocity: { value: null as any }, boundarySpace: { value: new THREE.Vector2() }, palette: { value: paletteTex }, bgColor: { value: bgVec4 } };
    let outScene: THREE.Scene, outCamera: THREE.Camera;
    function initOutput() { const r = makeScene(face_vert, color_frag, outUniforms); outScene = r.scene; outCamera = r.camera; (outScene.children[0] as THREE.Mesh).material = new THREE.RawShaderMaterial({ vertexShader: face_vert, fragmentShader: color_frag, transparent: true, depthWrite: false, uniforms: outUniforms }); }

    // Simulation options (mutable)
    const simOpts = { mouse_force: mouseForce, cursor_size: cursorSize, isViscous, viscous, iterations_viscous: iterationsViscous, iterations_poisson: iterationsPoisson, dt, BFECC, resolution, isBounce };

    function simulationStep() {
      if (simOpts.isBounce) boundarySpace.set(0, 0); else boundarySpace.copy(cellScale);
      runAdvection(simOpts.dt, simOpts.isBounce, simOpts.BFECC);
      runForce(simOpts.mouse_force, simOpts.cursor_size);
      const vel = simOpts.isViscous ? runViscous(simOpts.viscous, simOpts.iterations_viscous, simOpts.dt) : fbos.vel_1;
      runDivergence(vel);
      const pressure = runPoisson(simOpts.iterations_poisson);
      runPressure(vel, pressure);
      outUniforms.velocity.value = fbos.vel_0.texture;
      Common.renderer!.setRenderTarget(null);
      Common.renderer!.render(outScene, outCamera);
    }

    // ─── BOOT ─────────────────────────────────────────────────────────────────
    const container = mountRef.current!;
    container.style.position = 'absolute'; container.style.inset = '0'; container.style.overflow = 'hidden';

    Common.init(container);
    Mouse.init(container);
    Mouse.autoIntensity = autoIntensity; Mouse.takeoverDuration = takeoverDuration;
    container.prepend(Common.renderer!.domElement);

    calcSize(resolution); createFBOs();
    initAdvection(); initForce(); initViscous(); initDivergence(); initPoisson(); initPressure(); initOutput();

    let lastUserInteraction = performance.now();
    Mouse.onInteract = () => { lastUserInteraction = performance.now(); autoDriver.forceStop(); };
    const autoDriver = new AutoDriver({ enabled: autoDemo, speed: autoSpeed, resumeDelay: autoResumeDelay, rampDuration: autoRampDuration });

    let running = false;
    function loop() {
      if (!running) return;
      autoDriver.update(lastUserInteraction);
      Mouse.update(); Common.update();
      simulationStep();
      rafRef.current = requestAnimationFrame(loop);
    }
    function start() { if (running) return; running = true; loop(); }
    function pause() { running = false; if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; } }
    function resize() { Common.resize(); calcSize(simOpts.resolution); resizeFBOs(); }

    webglRef.current = { simOpts, autoDriver, start, pause, resize, dispose() {
      try {
        Mouse.dispose();
        const c = Common.renderer?.domElement;
        if (c?.parentNode) c.parentNode.removeChild(c);
        Common.renderer?.dispose(); Common.renderer?.forceContextLoss();
      } catch { /* ignore */ }
    }};

    start();

    const io = new IntersectionObserver(entries => {
      const vis = entries[0].isIntersecting && entries[0].intersectionRatio > 0;
      isVisibleRef.current = vis;
      if (!webglRef.current) return;
      if (vis && !document.hidden) webglRef.current.start(); else webglRef.current.pause();
    }, { threshold: [0, 0.01, 0.1] });
    io.observe(container); intersectionObserverRef.current = io;

    const ro = new ResizeObserver(() => {
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = requestAnimationFrame(() => { webglRef.current?.resize(); });
    });
    ro.observe(container); resizeObserverRef.current = ro;

    const onVisibility = () => { if (document.hidden) pause(); else if (isVisibleRef.current) start(); };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try { resizeObserverRef.current?.disconnect(); } catch { /* ignore */ }
      try { intersectionObserverRef.current?.disconnect(); } catch { /* ignore */ }
      document.removeEventListener('visibilitychange', onVisibility);
      webglRef.current?.dispose();
      webglRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mountRef}
      className={`liquid-ether-container${className ? ' ' + className : ''}`}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none', ...style }}
    />
  );
}
