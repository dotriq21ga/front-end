import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private rootUrl: string = 'http://localhost:3000/api/'
    constructor(
        private httpClient: HttpClient,
        private loadingService: LoadingService
    ) { }

    get(url: string): Observable<any> {
        return this.httpClient.get(this.rootUrl + url);
    }

    postAndLoading(url: string, body: any): Observable<any> {
        this.loadingService.show();
        return this.httpClient.post(this.rootUrl + url, body).pipe(
            finalize(() => {
                this.loadingService.hide();
            })
        );
    }

    post(url: string, body: any): Observable<any> {
        return this.httpClient.post(this.rootUrl + url, body)
    }

    delete(url: string): Observable<any> {
        return this.httpClient.delete(this.rootUrl + url)
    }
}