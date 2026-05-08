import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const departamento = searchParams.get("departamento");
  const busqueda = searchParams.get("q");

  let query = supabaseAdmin
    .from("contactos")
    .select("*, departamento:departamentos(nombre)")
    .order("nombre");

  if (departamento) query = query.eq("departamento_id", departamento);
  if (busqueda) query = query.or(`nombre.ilike.%${busqueda}%,apellido.ilike.%${busqueda}%,email.ilike.%${busqueda}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nombre, apellido, email, cargo, departamento_id, empresa, telefono, etiquetas } = body;

  if (!nombre || !apellido || !email) {
    return NextResponse.json({ error: "nombre, apellido y email son requeridos" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("contactos")
    .insert({ nombre, apellido, email, cargo, departamento_id, empresa, telefono, etiquetas: etiquetas || [] })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
