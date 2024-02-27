import { User } from "./auth";

export class Message {
    channelId!: string;
    content!: string;
    id?: string;
    send_at!: string;
    user?: User;
    userId?: string;
}

export class CreateMessagePayload {
    channelId!: string;
    message!: string;
}