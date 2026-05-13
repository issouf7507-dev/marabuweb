import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation des champs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Les champs nom, email et message sont requis" },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Vérification de la clé API Brevo
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY n'est pas définie");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    // Fonction pour échapper les caractères HTML
    const escapeHtml = (text: string) => {
      const map: { [key: string]: string } = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    // Échapper les valeurs pour éviter les injections XSS
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = subject ? escapeHtml(subject) : "";
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    // Préparer le contenu HTML de l'email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1D4851; border-bottom: 2px solid #689D71; padding-bottom: 10px;">
          Nouveau message de contact
        </h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Nom:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          ${safeSubject ? `<p><strong>Sujet:</strong> ${safeSubject}</p>` : ""}
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: #1D4851;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Ce message a été envoyé depuis le formulaire de contact du site web Marabu.</p>
          <p>Vous pouvez répondre directement à cet email pour contacter l'utilisateur.</p>
        </div>
      </div>
    `;

    // Contenu texte brut
    const textContent = `
Nouveau message de contact

Nom: ${name}
Email: ${email}
${subject ? `Sujet: ${subject}` : ""}

Message:
${message}

---
Ce message a été envoyé depuis le formulaire de contact du site web Marabu.
Vous pouvez répondre directement à cet email pour contacter l'utilisateur.
    `;

    // Préparer le payload pour l'API Brevo
    const emailData = {
      sender: {
        name: "Marabu Services",
        email: "info@marabu.services",
      },
      to: [
        {
          email: "ibo@marabu.services",
          name: "Marabu Services",
        },
      ],
      replyTo: {
        email: safeEmail,
        name: safeName,
      },
      subject: safeSubject || `Contact depuis le site web - ${safeName}`,
      htmlContent: htmlContent,
      textContent: textContent,
    };

    // Appel à l'API REST Brevo
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Erreur Brevo API:", responseData);
      return NextResponse.json(
        {
          error: "Erreur lors de l'envoi de l'email",
          details: responseData.message || "Erreur inconnue",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Email envoyé avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de l'envoi de l'email",
        details: error.message || "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
