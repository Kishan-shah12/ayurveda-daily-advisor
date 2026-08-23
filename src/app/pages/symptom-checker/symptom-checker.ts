import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-symptom-checker',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './symptom-checker.html',
  styleUrl: './symptom-checker.css',
})
export class SymptomChecker {
  private readonly profileService = inject(ProfileService);

  protected readonly symptom = signal<string>('');
  protected readonly isLoading = signal<boolean>(false);
  protected readonly generatedRemedy = signal<string | null>(null);
  protected readonly error = signal<string | null>(null);

  protected readonly userDosha = this.profileService.savedDosha;

  async checkSymptom() {
    const trimmedSymptom = this.symptom().trim();
    if (!trimmedSymptom) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.generatedRemedy.set(null);

    try {
      const response = await fetch('/api/remedy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptom: trimmedSymptom,
          dosha: this.userDosha()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate remedy');
      }

      const data = await response.json();
      this.generatedRemedy.set(data.remedy);
    } catch (e) {
      this.error.set('Sorry, we could not generate a remedy at this time. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Format markdown-like bold text (e.g. **Text**) into HTML for basic rendering
  formatRemedy(text: string): string {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
               .replace(/\n/g, '<br>');
  }
}
