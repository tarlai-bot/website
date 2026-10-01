export interface ContactForm {
  name: string;
  email: string;
  title: string;
  message: string;
}

export interface ContactInquiry extends ContactForm {
  id: string;
  status: 'new' | 'responded';
  createdAt: Date;
}
