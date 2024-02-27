import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/core/models/auth';
import { ChannelContent } from 'src/app/core/models/channel';
import { Message } from 'src/app/core/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})

export class ChannelsComponent {
  channelContent!: ChannelContent;
  messageCreateForm!: FormGroup;
  user!: User;
  updatechannelContent: any;
  INTERVAL_UPDATE = 3000

  constructor(
    private fb: FormBuilder,
    private socketService: SocketService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.user = authService.user
    this.getDataChannelContent();
    this.handSuccessMessageCreate();
    this.handleChangeParamId();
  }

  handleChangeParamId() {
    let paramId;
    this.route.paramMap.subscribe((param: ParamMap) => {
      paramId = param.get('id') as string;
      this.initForm(paramId)
      this.emitAndIntervalUpdateChannelContent(paramId);
    })
  }

  handSuccessMessageCreate() {
    this.socketService.createMessageSuccess().subscribe((message) => {
      if (message.userId === this.user.id) {
        this.channelContent.message.pop();
      }
      this.channelContent.message.push(message)
    })
  }

  initForm(channelId: string) {
    this.messageCreateForm = this.fb.group({
      channelId: [channelId],
      message: ['', Validators.required]
    })
  }

  sendMessage(event: any) {
    this.messageCreateForm.get('message')?.setValue(event.message);
    this.socketService.emitToCreateMessage(this.messageCreateForm.value)
    const message: Message = {
      content: this.messageCreateForm.get('message')?.value,
      channelId: this.messageCreateForm.get('channelId')?.value,
      userId: this.user.id,
      user: this.user,
      send_at: (new Date()).toString(),
    }
    this.channelContent.message.push(message)
  }

  emitAndIntervalUpdateChannelContent(channelId: string) {
    this.socketService.emitToChannelContent(channelId)
    clearInterval(this.updatechannelContent)
    this.updatechannelContent = setInterval(() => {
      this.socketService.emitToChannelContent(channelId)
    }, this.INTERVAL_UPDATE);
  }

  getDataChannelContent() {
    this.socketService.getDataChannelContent().subscribe((data: any) => {
      this.channelContent = data
    })
  }

  trackByFn(item: any): string {
    return item.content;
  }

  isReply(userId?: string) {
    if (userId === this.user.id) {
      return true;
    }
    return false;
  }

  getGroupMembershipInformation(channelContent: ChannelContent) {
    return channelContent ? `online : ${channelContent.onlineUser} , member : ${channelContent.totalUser}` : '';
  }

  getTitle(channelContent: ChannelContent) {
    return channelContent ? channelContent.name : ""
  }

  getAvatar(avatar?: string) {
    return avatar ? avatar : "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png";
  }

  getName(user?: User) {
    return user ? user.userName : "BOT";
  }
}
