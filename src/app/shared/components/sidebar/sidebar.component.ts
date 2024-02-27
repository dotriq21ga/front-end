import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelMessages } from 'src/app/core/models/channel';
import { SocketService } from 'src/app/services/socket.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  channelsMessage!: ChannelMessages[]

  constructor(
    private utilityService: UtilityService,
    private router: Router,
    private socketService: SocketService,
    private cdRef: ChangeDetectorRef
  ) {
    this.getUsersOfChannel();
    this.handSuccessMessageCreate();
  }

  handSuccessMessageCreate() {
    this.socketService.createMessageSuccess().subscribe((message) => {
      const index = this.channelsMessage.findIndex((channel) => { return channel.id === message.channelId });
      if (this.channelsMessage[index].message) {
        this.channelsMessage[index].message[0] = message
      }
    })
  }

  getUsersOfChannel() {
    this.utilityService.channels.subscribe({
      next: (value) => {
        this.channelsMessage = value;
      }
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  getMessage(item: ChannelMessages): string {
    return item.message.length > 0 ? item.message[0].content : 'No message'
  }

  channelSwitch(idChannel: string) {
    this.router.navigate([`dashboard/channels/${idChannel}`])
  }
}
