import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from 'next';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_APP_EMAIL,
    pass: process.env.NEXT_APP_PWD,
  },
});

export type ContactType = {
  from: string;
  title: string;
  content: string;
  file?: string;
};

type MailOptionType = {
  to: string;
  from: string;
  subject: string;
  attachments?: any[];
  html: string;
};

/*
    <내가 유저에게 보내기>
    to: from || "",
    from : process.env.NEXT_APP_EMAIL!,
*/
/*
    <유저가 나에게 보내기>
    to: process.env.NEXT_APP_EMAIL!,
    from : from || "",
*/

export function sendEmail({ from, title, content, file }: ContactType) {
  const mailOptions: MailOptionType = {
    to: from || "",
    from : process.env.NEXT_APP_EMAIL!,
    subject: `${title}`,
    // attachments: [
    //   {
    //     path: file,
    //   },
    // ],
    html: `
    		<h1>${title}</h1>
    		<div>${content}</div>
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
  if (req.method === 'POST') {
    try {
      const emailData: ContactType = req.body;
      await sendEmail(emailData);
      res.status(200).json({ message: '이메일이 성공적으로 전송되었습니다.' });
    } catch (error) {
      console.error('이메일 전송 중 오류 발생:', error);
      res.status(500).json({ message: '이메일 전송에 실패했습니다.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
