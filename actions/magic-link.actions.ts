"use server"
import nodemailer from "nodemailer"
import { MagicLinkEmailTemplate } from "@/lib/email"

export async function sendMagicLink(email: string, token: string, url: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODE_MAILER_AUTHOR_MAIL!,
        pass: process.env.NODE_MAILER_SECRET!,
      },
    })

    const appName = "TaskFlow"
    const expiresInMinutes = 15

    const mailOptions = {
      from: process.env.NODE_MAILER_AUTHOR_MAIL!,
      to: email,
      subject: `${appName} · Your magic link`,
      html: MagicLinkEmailTemplate({ appName, url, expiresInMinutes }),
    }
    await transporter.sendMail(mailOptions)

    return {
      message: "Magic link sent successfully",
      status: 200,
    }
  } catch (error) {
    return {
      message: "Failed to send magic link",
      status: 500,
    }
  }
}
