export class LoginPayload {
    email!: string;
    password!: string;
    rememberClient!: boolean;
}

export class User {
    id!: string;
    name!: string;
    userName!: string;
    email!: string;
    avatar?: string;
}

export interface IResponseAuthenSuccess {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: string;
}