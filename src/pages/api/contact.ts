import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ContactType, MailOptionType } from "@/interface/Mail";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_APP_EMAIL,
    pass: process.env.NEXT_APP_PWD,
  },
});


export function sendEmail({ from, title, content, web_url }: ContactType) {
  const mailOptions: MailOptionType = {
    to: process.env.NEXT_APP_EMAIL!,
    from: from,
    subject: `${title}`,
    html: `
    		<h1>${title}</h1>
    		<div>${content}</div>
    		<a href="${web_url}">${web_url}</a>
    		</br>
    		<p>보낸사람 : ${from}</p>
    		`,
  };
  return transporter.sendMail(mailOptions);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const emailData: ContactType = req.body;
      await sendEmail(emailData);
      res.status(200).json({ message: "이메일이 성공적으로 전송되었습니다." });
    } catch (error) {
      console.error("이메일 전송 중 오류 발생:", error);
      res.status(500).json({ message: "이메일 전송에 실패했습니다." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
