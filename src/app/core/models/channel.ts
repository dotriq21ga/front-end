import { Message } from "./message";

export class Channel {
    id!: string;
    name!: string;
    description!: string;
}

export class ChannelMessages extends Channel {
    message!: Message[]
}

export class ChannelCreatePayload {
    name!: string;
    description!: string;
    ownerId!: string;
}

export class ChannelContent extends Channel {
    onlineUser!: number;
    totalUser!: number;
    message!: Message[];
}

export class CreateChannelPayload{
    name! : string;
    description! : string;
}