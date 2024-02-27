import { Component } from '@angular/core';
import { NbDialogService, NbMenuItem, NbMenuService } from '@nebular/theme';
import { User } from 'src/app/core/models/auth';
import { AuthService } from 'src/app/services/auth.service';
import { FormCreateChannelComponent } from '../form-create-channel/form-create-channel.component';
import { Subject, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { Channel } from 'src/app/core/models/channel';
import { Cookie } from '../../helpers/cookie';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { UsersOfChannelService } from 'src/app/services/users-of-channel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  user: User = this.authService.user;
  searchResults!: Channel[];
  isLoading: boolean = false;
  searchBar: string = '';
  inputSearchChange = new Subject<string>();

  constructor(
    private authService: AuthService,
    private dialogService: NbDialogService,
    private usersOfChannelService: UsersOfChannelService,
    private cookie: Cookie,
    private router: Router,
    private menuService: NbMenuService,
    private socketService: SocketService
  ) {
    this.handleMenuClickEvent();
    this.search();
  }

  search() {
    this.inputSearchChange.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((respone) => {
      this.usersOfChannelService.searchChannel(respone).pipe(
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe((json) => {
        this.searchResults = json;
      });
    })
  }

  handleMenuClickEvent() {
    this.menuService.onItemClick().subscribe((event) => {
      this.handleMenuItemClickEvent(event.item);
    });
  }

  handleMenuItemClickEvent(item: NbMenuItem) {
    if (item.data?.action === 'logout') {
      this.logout();
    }
  }

  joinChannel(data: Channel) {
    this.searchBar = '';
    this.searchResults = [];
    this.socketService.emitToJoinChannel(data.id)
  }

  onChanged() {
    this.isLoading = true;
    this.inputSearchChange.next(this.searchBar)
  }

  getAvatar(avatar?: string) {
    return avatar ? avatar : "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-1024.png";
  }

  openDialog() {
    this.dialogService.open(FormCreateChannelComponent)
  }

  iteam: NbMenuItem[] = [
    { title: this.user.name },
    { title: 'Home', link: '/dashboard/home' },
    { title: "Logout", data: { action: 'logout' } }
  ]

  logout() {
    this.cookie.removeCookie(this.authService.keyToken);
    this.socketService.disconnect();
    this.router.navigate(['/auth/login']);
  }
}