import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IResponseAuthenSuccess, LoginPayload, User } from '../core/models/auth';
import { Router } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { Cookie } from '../shared/helpers/cookie';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private rootUrl: string = "auth";
    keyToken: string = "token";
    keyUserId: string = "user_id";
    user!: User;
    constructor(private apiService: ApiService, private router: Router, private cookie: Cookie) { }

    async checkLogin(): Promise<boolean> {
        try {
            this.user = await lastValueFrom(this.userInfor())
            if (this.user) {
                return true
            }
            throw Error
        } catch (error) {
            this.router.navigate(['auth/login']);
            return false
        }
    }

    login(data: LoginPayload): Observable<IResponseAuthenSuccess> {
        const url = this.rootUrl + "/login";
        return this.apiService.postAndLoading(url, data);
    }

    userInfor(): Observable<User> {
        const url = this.rootUrl + "/userInfor";
        return this.apiService.get(url)
    }

    handleHeaderAuth(): string {
        return this.cookie.getCookie(this.keyToken);
    }
}
