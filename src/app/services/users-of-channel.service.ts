import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Channel } from '../core/models/channel';

@Injectable({
  providedIn: 'root'
})
export class UsersOfChannelService {
  rootUrl: string = 'users-of-channel'
  constructor(private apiService: ApiService) { }

  searchChannel(keyWord: string) : Observable<Channel[]> {
    const url = `${this.rootUrl}?name=${keyWord}`;
    return this.apiService.get(url);
  }
}
