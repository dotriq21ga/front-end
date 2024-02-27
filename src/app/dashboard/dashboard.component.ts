import { Component } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  constructor(
    private router: Router,
    private socketService: SocketService,
    private utilityService: UtilityService,
  ) {
    this.handleSuccessCreateOrJoinChannel();
  }

  handleSuccessCreateOrJoinChannel() {
    this.socketService.createAndJoinChannelSuccess().subscribe((json: any) => {
      this.utilityService.updateUsersOfChannel();
      this.router.navigate([`dashboard/channels/${json.id}`]);
    })
  }
}
