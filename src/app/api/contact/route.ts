import { Resend } from "resend";
import { NextResponse } from "next/server";
import { isEuropeanPhoneNumber } from "@/lib/phone";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 },
      );
    }

    if (typeof phone !== "string" || !isEuropeanPhoneNumber(phone)) {
      return NextResponse.json(
        { error: "invalid_phone" },
        { status: 400 },
      );
    }

    if (typeof message !== "string" || message.trim().length < 30) {
      return NextResponse.json(
        { error: "Le message doit contenir au moins 30 caractères" },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "IBFautomate <contact@ibfautomate.com>",
      to: ["IBFautomate@outlook.com", "benfakir.imrane@gmail.com"],
      replyTo: email,
      subject: `Nouvelle demande de ${name}${subject ? ` — ${subject}` : ""}`,
      text: [
        `De : ${name}`,
        `Email : ${email}`,
        `Téléphone : ${phone}`,
        subject ? `Sujet : ${subject}` : null,
        "",
        "Message :",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    // Envoi vers le CRM (tolérant aux erreurs)
    try {
      await fetch("https://ibfautomate-crm-phi.vercel.app/api/webhook/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-ibfautomate-secret": process.env.CRM_WEBHOOK_SECRET ?? "",
        },
        body: JSON.stringify({
          source: "FORMULAIRE",
          nom: name,
          email,
          telephone: phone,
          sujet: subject || "Autre",
          message,
        }),
      });
    } catch (err) {
      console.error("Erreur envoi vers CRM:", err);
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}