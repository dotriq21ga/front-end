import { Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { ChannelMessages } from '../core/models/channel';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  channels = new BehaviorSubject<ChannelMessages[]>([]);

  constructor(public channelService: ChannelService) { }

  async loadChannels() {
    Promise.all([
      this.channels.next(await lastValueFrom(this.channelService.getChannelsOfUser()))
    ])
  }

  async updateUsersOfChannel() {
    this.channels.next(await lastValueFrom(this.channelService.getChannelsOfUser()))
  }
}
