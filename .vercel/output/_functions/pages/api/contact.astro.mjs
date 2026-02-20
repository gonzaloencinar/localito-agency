import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend("re_gj4FAs52_6Jx99w9eBUYWAiig6vha6FsJ");
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { nombre, telefono, email, web, ficha, mensaje, tipo } = body;
    if (!nombre || !email) {
      return new Response(JSON.stringify({ error: "Nombre y email son obligatorios" }), { status: 400 });
    }
    const subject = tipo === "auditoria" ? `Nueva solicitud de auditoría - ${nombre}` : `Nuevo contacto - ${nombre}`;
    const html = `
      <h2>${tipo === "auditoria" ? "Solicitud de Auditoría SEO" : "Formulario de Contacto"}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Nombre</td><td style="padding:8px;border-bottom:1px solid #eee;">${nombre}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
        ${telefono ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Teléfono</td><td style="padding:8px;border-bottom:1px solid #eee;">${telefono}</td></tr>` : ""}
        ${web ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Web</td><td style="padding:8px;border-bottom:1px solid #eee;">${web}</td></tr>` : ""}
        ${ficha ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Ficha Google</td><td style="padding:8px;border-bottom:1px solid #eee;">${ficha}</td></tr>` : ""}
        ${mensaje ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Mensaje</td><td style="padding:8px;border-bottom:1px solid #eee;">${mensaje}</td></tr>` : ""}
      </table>
    `;
    await resend.emails.send({
      from: "Localito <noreply@fastship.dev>",
      to: "gonzalo@fastship.dev",
      subject,
      html,
      replyTo: email
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Error al enviar el email" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
