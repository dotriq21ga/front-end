import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  rootUrl: string = 'channel'
  constructor(private apiService: ApiService) { }

  getChannelsOfUser() {
    const url = this.rootUrl;
    return this.apiService.get(url);
  }
}
