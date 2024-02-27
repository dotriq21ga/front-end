import { Injectable } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Injectable({
  providedIn: 'root'
})

export class SocketInitializer {
  constructor(private socketService: SocketService) { }

  initialize(): () => Promise<void> {
    return async () => {
      await this.socketService.initializeSocket();
    };
  }
}