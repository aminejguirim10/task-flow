"use server"
import nodemailer from "nodemailer"

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

    const mailOptions = {
      from: process.env.NODE_MAILER_AUTHOR_MAIL!,
      to: email,
      subject: `Magic Link Email task-flow`,
      text: `Click the following link to log in: ${url}`,
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
