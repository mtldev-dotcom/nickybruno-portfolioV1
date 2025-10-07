import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "@/lib/schemas/contact";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? process.env.RESEND_CONTACT_TO ?? process.env.NEXT_PUBLIC_CONTACT_TO;

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid payload",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY || !CONTACT_TO) {
    console.warn("Contact form attempted without RESEND_API_KEY or CONTACT_TO_EMAIL configured.");
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const data = parsed.data;

  try {
    await resend.emails.send({
      to: CONTACT_TO,
      from: "Nicky Bruno Portfolio <hello@nickybruno.com>",
      replyTo: data.email,
      subject: `New contact from ${data.name}`,
      text: [
        `Locale: ${data.locale}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company ?? "\u2014"}`,
        `Budget: ${data.budget ?? "\u2014"}`,
        "",
        "Project details:",
        data.project,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
