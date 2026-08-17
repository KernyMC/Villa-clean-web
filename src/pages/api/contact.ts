import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const POST: APIRoute = async ({ request }) => {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const phone = payload.phone?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !phone || !message) {
    return json({ ok: false, error: "Name, email, phone, and message are required." }, 400);
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return json({ ok: false, error: "Email is not configured yet." }, 503);
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 465,
    secure: SMTP_SECURE !== "false",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Villa Home Detail — Website" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL || SMTP_USER,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\nPhone: ${phone}\n\n${message}`,
    });
  } catch (error) {
    console.error("Failed to send contact form email", error);
    return json({ ok: false, error: "Could not send your message. Please try again." }, 502);
  }

  return json({ ok: true });
};

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
