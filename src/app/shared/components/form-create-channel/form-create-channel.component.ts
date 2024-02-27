import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-form-create-channel',
  templateUrl: './form-create-channel.component.html',
  styleUrls: ['./form-create-channel.component.scss']
})

export class FormCreateChannelComponent {
  formCreatChannel!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<FormCreateChannelComponent>,
    private socketService: SocketService
  ) {
    this.initForm();
  }

  initForm() {
    this.formCreatChannel = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.formCreatChannel.valid) {
      this.socketService.emitToCreateChannel(this.formCreatChannel.value)
      this.dialogRef.close();
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
