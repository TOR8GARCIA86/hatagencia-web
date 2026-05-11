export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("campanias")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { titulo, asunto, contenido_html, contenido_texto, tipo, programada_para } = body;

  if (!titulo || !asunto || !contenido_html) {
    return NextResponse.json({ error: "titulo, asunto y contenido_html son requeridos" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("campanias")
    .insert({
      titulo,
      asunto,
      contenido_html,
      contenido_texto,
      tipo: tipo || "newsletter",
      estado: "borrador",
      programada_para: programada_para || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
