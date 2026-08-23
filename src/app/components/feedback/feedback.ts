import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback {
  protected readonly isOpen = signal(false);
  protected readonly rating = signal<number>(0);
  protected readonly comments = signal<string>('');
  protected readonly isSubmitted = signal(false);

  toggleModal() {
    this.isOpen.update(v => !v);
    if (!this.isOpen()) {
      this.resetForm();
    }
  }

  setRating(stars: number) {
    this.rating.set(stars);
  }

  submitFeedback() {
    if (this.rating() === 0) return;
    
    // Simulate API call to save feedback
    setTimeout(() => {
      this.isSubmitted.set(true);
      setTimeout(() => {
        this.toggleModal();
      }, 2500);
    }, 500);
  }

  resetForm() {
    this.rating.set(0);
    this.comments.set('');
    this.isSubmitted.set(false);
  }
}
