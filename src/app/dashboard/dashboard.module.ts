import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { ChannelsComponent } from './channels/channels.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ChannelsComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  providers: []
})
export class DashboardModule { }
