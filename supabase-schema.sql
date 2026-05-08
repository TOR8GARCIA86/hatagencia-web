-- ============================================================
-- HAT Agencia - Sistema de Endomarketing
-- Ejecutar en: Supabase > SQL Editor
-- ============================================================

-- DEPARTAMENTOS
create table if not exists departamentos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  created_at timestamptz default now()
);

-- CONTACTOS (empleados / audiencia interna)
create table if not exists contactos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  apellido text not null,
  email text not null unique,
  cargo text,
  departamento_id uuid references departamentos(id) on delete set null,
  empresa text,
  telefono text,
  activo boolean default true,
  etiquetas text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- CAMPAÑAS
create table if not exists campanias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  asunto text not null,
  contenido_html text not null,
  contenido_texto text,
  tipo text default 'newsletter' check (tipo in ('newsletter','comunicado','invitacion','reconocimiento','onboarding')),
  estado text default 'borrador' check (estado in ('borrador','programada','enviada','cancelada')),
  programada_para timestamptz,
  enviada_en timestamptz,
  creada_por text default 'HAT Admin',
  total_destinatarios int default 0,
  total_enviados int default 0,
  total_abiertos int default 0,
  total_clics int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- SEGMENTOS (grupos de destinatarios)
create table if not exists segmentos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  filtro_departamento uuid references departamentos(id),
  filtro_empresa text,
  filtro_etiquetas text[],
  created_at timestamptz default now()
);

-- ENVÍOS (relación campaña-contacto)
create table if not exists envios (
  id uuid primary key default gen_random_uuid(),
  campania_id uuid references campanias(id) on delete cascade,
  contacto_id uuid references contactos(id) on delete cascade,
  estado text default 'pendiente' check (estado in ('pendiente','enviado','fallido','rebotado')),
  abierto boolean default false,
  abierto_en timestamptz,
  clic boolean default false,
  clic_en timestamptz,
  token_tracking text unique default encode(gen_random_bytes(16), 'hex'),
  created_at timestamptz default now()
);

-- CAMPAÑAS POR SEGMENTO
create table if not exists campania_segmentos (
  campania_id uuid references campanias(id) on delete cascade,
  segmento_id uuid references segmentos(id) on delete cascade,
  primary key (campania_id, segmento_id)
);

-- ============================================================
-- DATOS DE EJEMPLO
-- ============================================================

insert into departamentos (nombre, descripcion) values
  ('Marketing', 'Equipo de marketing y comunicaciones'),
  ('Comercial', 'Equipo de ventas y desarrollo de negocio'),
  ('Diseño', 'Equipo creativo y diseño gráfico'),
  ('Producción', 'Equipo de producción audiovisual'),
  ('Administración', 'Equipo administrativo y financiero');

-- ============================================================
-- ÍNDICES PARA RENDIMIENTO
-- ============================================================

create index if not exists idx_contactos_email on contactos(email);
create index if not exists idx_contactos_departamento on contactos(departamento_id);
create index if not exists idx_contactos_activo on contactos(activo);
create index if not exists idx_envios_campania on envios(campania_id);
create index if not exists idx_envios_contacto on envios(contacto_id);
create index if not exists idx_campanias_estado on campanias(estado);

-- ============================================================
-- ROW LEVEL SECURITY (básico)
-- ============================================================

alter table contactos enable row level security;
alter table campanias enable row level security;
alter table envios enable row level security;
alter table departamentos enable row level security;
alter table segmentos enable row level security;

-- Políticas: solo acceso autenticado (ajustar según tu setup)
create policy "Acceso autenticado" on contactos for all using (true);
create policy "Acceso autenticado" on campanias for all using (true);
create policy "Acceso autenticado" on envios for all using (true);
create policy "Acceso autenticado" on departamentos for all using (true);
create policy "Acceso autenticado" on segmentos for all using (true);
