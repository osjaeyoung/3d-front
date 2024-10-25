export interface ContactType {
  from: string;
  title: string;
  content: string;
  web_url: string;
}

export interface MailOptionType {
  to: string;
  from: string;
  subject: string;
  html: string;
  attachments?: any[];
}
