interface Request {
    email: string;
    orderTotal: number;
    name: string;
}
export default class SendOrderEmailService {
    execute({ email, orderTotal, name }: Request): Promise<void>;
}
export {};
