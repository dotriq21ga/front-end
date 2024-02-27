import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Cookie {
    constructor() { }
    getCookie(key: string): string {
        const value = "; " + document.cookie;
        const parts = value.split("; " + key + "=");
        if (parts.length === 2) return parts.pop()?.split(";").shift() || '';
        return '';
    }
    setCookie(key: string, token: string, time: Date) {
        return document.cookie = `${key}=${token}; path=/; expires=${time}`;
    }

    removeCookie(key: string) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}