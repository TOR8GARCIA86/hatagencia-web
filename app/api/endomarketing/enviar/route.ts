import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { campania_id, contacto_ids } = await req.json();

  if (!campania_id || !contacto_ids?.length) {
    return NextResponse.json({ error: "campania_id y contacto_ids son requeridos" }, { status: 400 });
  }

  // Obtener campaña
  const { data: campania, error: errCampania } = await supabaseAdmin
    .from("campanias")
    .select("*")
    .eq("id", campania_id)
    .single();

  if (errCampania || !campania) {
    return NextResponse.json({ error: "Campaña no encontrada" }, { status: 404 });
  }

  // Obtener contactos
  const { data: contactos, error: errContactos } = await supabaseAdmin
    .from("contactos")
    .select("*")
    .in("id", contacto_ids)
    .eq("activo", true);

  if (errContactos || !contactos?.length) {
    return NextResponse.json({ error: "No se encontraron contactos activos" }, { status: 404 });
  }

  // Crear registros de envío
  const envios = contactos.map((c) => ({
    campania_id,
    contacto_id: c.id,
    estado: "pendiente" as const,
  }));

  await supabaseAdmin.from("envios").insert(envios);

  // Enviar emails
  let enviados = 0;
  let fallidos = 0;

  for (const contacto of contactos) {
    const htmlPersonalizado = campania.contenido_html
      .replace(/\{\{nombre\}\}/g, contacto.nombre)
      .replace(/\{\{apellido\}\}/g, contacto.apellido)
      .replace(/\{\{email\}\}/g, contacto.email);

    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "HAT Agencia <noreply@hatagencia.com>",
        to: contacto.email,
        subject: campania.asunto,
        html: htmlPersonalizado,
      });

      // Marcar como enviado
      await supabaseAdmin
        .from("envios")
        .update({ estado: "enviado" })
        .eq("campania_id", campania_id)
        .eq("contacto_id", contacto.id);

      enviados++;
    } catch {
      await supabaseAdmin
        .from("envios")
        .update({ estado: "fallido" })
        .eq("campania_id", campania_id)
        .eq("contacto_id", contacto.id);

      fallidos++;
    }
  }

  // Actualizar estadísticas de la campaña
  await supabaseAdmin
    .from("campanias")
    .update({
      estado: "enviada",
      enviada_en: new Date().toISOString(),
      total_destinatarios: contactos.length,
      total_enviados: enviados,
    })
    .eq("id", campania_id);

  return NextResponse.json({
    success: true,
    enviados,
    fallidos,
    total: contactos.length,
  });
}
