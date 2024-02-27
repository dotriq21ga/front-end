import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isLoading: boolean = true;
  constructor(
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.handleLoading();
  }

  handleLoading() {
    this.loadingService.isLoading.subscribe((data) => {
      this.isLoading = data
    })
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}