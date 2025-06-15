"use server"

interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail(data: EmailData) {
  // Simulation d'envoi d'email - remplacer par Resend, Nodemailer, etc.
  console.log("Sending email:", data)

  // Exemple avec Resend (décommentez si vous avez configuré Resend)
  /*
  const { Resend } = require('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  try {
    const result = await resend.emails.send({
      from: 'ImmoExpert <noreply@immoexpert.fr>',
      to: data.to,
      subject: data.subject,
      html: data.html,
    })
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: error.message }
  }
  */

  // Simulation
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true, message: "Email envoyé avec succès" }
}

export async function sendContactNotification(contactData: any) {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Nouvelle demande de contact - ImmoExpert</h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Informations du contact :</h3>
        <p><strong>Nom :</strong> ${contactData.name}</p>
        <p><strong>Email :</strong> ${contactData.email}</p>
        ${contactData.phone ? `<p><strong>Téléphone :</strong> ${contactData.phone}</p>` : ""}
        <p><strong>Sujet :</strong> ${contactData.subject}</p>
        ${contactData.propertyTitle ? `<p><strong>Propriété :</strong> ${contactData.propertyTitle}</p>` : ""}
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h3>Message :</h3>
        <p style="line-height: 1.6;">${contactData.message}</p>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-radius: 8px;">
        <p style="margin: 0; color: #1e40af;">
          <strong>Action requise :</strong> Répondez à cette demande dans les plus brefs délais.
        </p>
      </div>
    </div>
  `

  return await sendEmail({
    to: "admin@immoexpert.fr",
    subject: `Nouvelle demande de contact - ${contactData.subject}`,
    html: emailHtml,
  })
}

export async function sendPropertyInquiryResponse(contactData: any) {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; padding: 20px; background-color: #2563eb; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">ImmoExpert</h1>
        <p style="margin: 5px 0 0 0;">Votre partenaire immobilier de confiance</p>
      </div>
      
      <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e2e8f0; border-top: none;">
        <h2 style="color: #1f2937;">Bonjour ${contactData.name},</h2>
        
        <p style="line-height: 1.6; color: #4b5563;">
          Nous avons bien reçu votre demande concernant notre propriété 
          <strong>"${contactData.propertyTitle}"</strong> et nous vous remercions de votre intérêt.
        </p>
        
        <p style="line-height: 1.6; color: #4b5563;">
          Un de nos conseillers va prendre contact avec vous dans les plus brefs délais 
          pour répondre à vos questions et organiser une visite si vous le souhaitez.
        </p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Vos coordonnées :</h3>
          <p style="margin: 5px 0;"><strong>Email :</strong> ${contactData.email}</p>
          ${contactData.phone ? `<p style="margin: 5px 0;"><strong>Téléphone :</strong> ${contactData.phone}</p>` : ""}
        </div>
        
        <p style="line-height: 1.6; color: #4b5563;">
          En attendant, n'hésitez pas à consulter nos autres propriétés sur notre site web 
          ou à nous contacter directement au <strong>04 93 XX XX XX</strong>.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://immoexpert.fr/properties" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 6px; display: inline-block;">
            Voir nos propriétés
          </a>
        </div>
        
        <p style="line-height: 1.6; color: #4b5563;">
          Cordialement,<br>
          <strong>L'équipe ImmoExpert</strong>
        </p>
      </div>
      
      <div style="padding: 20px; background-color: #f8fafc; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          ImmoExpert - 123 Boulevard de la Croisette, 06400 Cannes<br>
          Tél: 04 93 XX XX XX | Email: contact@immoexpert.fr
        </p>
      </div>
    </div>
  `

  return await sendEmail({
    to: contactData.email,
    subject: `Confirmation de votre demande - ${contactData.propertyTitle}`,
    html: emailHtml,
  })
}
