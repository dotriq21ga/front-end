import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebularModule } from '../core/Nebular/nebular';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormCreateChannelComponent } from './components/form-create-channel/form-create-channel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FormCreateChannelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NebularModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    NebularModule,
    SidebarComponent,
    HeaderComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
