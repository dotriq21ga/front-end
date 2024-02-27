import { Injectable } from '@angular/core';
import { Socket, io } from "socket.io-client";
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Channel, ChannelContent, CreateChannelPayload } from '../core/models/channel';
import { CreateMessagePayload, Message } from '../core/models/message';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private url = 'http://localhost:8000';
  private socket!: Socket;
  constructor(private authService: AuthService) { }

  async initializeSocket(): Promise<void> {
    const token = this.authService.handleHeaderAuth();
    if (token) {
      this.socket = io(this.url, {
        withCredentials: true,
        extraHeaders: {
          Authorization: `${token}`,
        }
      });
    }
  }

  getDataChannelContent(): Observable<ChannelContent> {
    return new Observable(observer => {
      this.socket.on('channelContent', (data: ChannelContent) => {
        observer.next(data);
      });
    });
  }

  createAndJoinChannelSuccess(): Observable<Channel> {
    return new Observable(observer => {
      this.socket.on('createOrJoinChannelSuccess', (data) => {
        observer.next(data)
      })
    })
  }

  createMessageSuccess(): Observable<Message> {
    return new Observable(observer => {
      this.socket.on('createMessageSuccess', (data) => {
        observer.next(data)
      })
    })
  }

  emitToChannelContent(channelId: string) {
    this.socket.emit('channelContent', channelId);
  }

  emitToCreateMessage(payload: CreateMessagePayload) {
    this.socket.emit('createMessage', payload)
  }

  emitToCreateChannel(payload: CreateChannelPayload) {
    this.socket.emit('createChannel', payload);
  }

  emitToJoinChannel(id: string) {
    this.socket.emit('joinChannel', id)
  }

  disconnect() {
    return this.socket.disconnect();
  }
}
