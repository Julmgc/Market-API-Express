interface Request {
    email: string;
    text: Text;
    name: string;
    subject: string;
}
export default class SendEmailService {
    execute({ email, text, name, subject }: Request): Promise<void>;
}
export {};
