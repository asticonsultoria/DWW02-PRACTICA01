import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="feedback" [class.success]="type === 'success'" [class.error]="type === 'error'">
      {{ message }}
    </div>
  `
})
export class FeedbackBannerComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' = 'success';
}
