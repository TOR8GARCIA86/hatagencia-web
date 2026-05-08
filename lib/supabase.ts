import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Tipos TypeScript de la base de datos
export type Contacto = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  cargo: string | null;
  departamento_id: string | null;
  empresa: string | null;
  telefono: string | null;
  activo: boolean;
  etiquetas: string[];
  created_at: string;
  updated_at: string;
  departamento?: Departamento;
};

export type Departamento = {
  id: string;
  nombre: string;
  descripcion: string | null;
  created_at: string;
};

export type Campania = {
  id: string;
  titulo: string;
  asunto: string;
  contenido_html: string;
  contenido_texto: string | null;
  tipo: "newsletter" | "comunicado" | "invitacion" | "reconocimiento" | "onboarding";
  estado: "borrador" | "programada" | "enviada" | "cancelada";
  programada_para: string | null;
  enviada_en: string | null;
  creada_por: string;
  total_destinatarios: number;
  total_enviados: number;
  total_abiertos: number;
  total_clics: number;
  created_at: string;
  updated_at: string;
};

export type Envio = {
  id: string;
  campania_id: string;
  contacto_id: string;
  estado: "pendiente" | "enviado" | "fallido" | "rebotado";
  abierto: boolean;
  abierto_en: string | null;
  clic: boolean;
  clic_en: string | null;
  token_tracking: string;
  created_at: string;
};
