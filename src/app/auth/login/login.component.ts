import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { IResponseAuthenSuccess } from 'src/app/core/models/auth';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import { Cookie } from 'src/app/shared/helpers/cookie';
import { timeProcessing } from 'src/app/shared/helpers/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  formLogin!: FormGroup;
  rememberClient: boolean = false;
  submitted: boolean = false;
  showError!: string;

  constructor(
    private fb: FormBuilder,
    private cookie: Cookie,
    private authService: AuthService,
    public router: Router,
    private socketService: SocketService
  ) {
    this.initForm();
  }

  initForm() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberClient: [this.rememberClient]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value)
        .pipe(
          catchError(error => {
            this.showError = error?.error?.message;
            return of(null);
          })
        )
        .subscribe((json) => {
          if (json) {
            this.handleAndStoreTokens(json);
            this.socketService.initializeSocket();
            this.router.navigate(['dashboard/home']);
          }
        })
    }
  }

  handleAndStoreTokens(data: IResponseAuthenSuccess) {
    const time = timeProcessing(data.expireInSeconds);
    this.cookie.setCookie(this.authService.keyToken, data.accessToken, time);
    this.cookie.setCookie(this.authService.keyUserId, data.userId, time);
  }
}
