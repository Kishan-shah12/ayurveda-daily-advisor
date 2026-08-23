import { Injectable, signal, computed, inject } from '@angular/core';
import { ProfileService } from './profile.service';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly profileService = inject(ProfileService);

  private readonly _messages = signal<ChatMessage[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly messages = this._messages.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly messageCount = computed(() => this._messages().length);

  async sendMessage(text: string): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed || this._isLoading()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: this.generateId(),
      role: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    this._messages.update(msgs => [...msgs, userMessage]);
    this._isLoading.set(true);
    this._error.set(null);

    try {
      // Build conversation history (last 10 exchanges for context window)
      const history = this._messages()
        .slice(-20) // Last 20 messages (10 exchanges)
        .filter(m => m.id !== userMessage.id) // Exclude the message we just added
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          text: m.text,
        }));

      const userDosha = this.profileService.savedDosha();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history, userDosha }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${response.status})`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: this.generateId(),
        role: 'assistant',
        text: data.response,
        timestamp: new Date(),
      };

      this._messages.update(msgs => [...msgs, assistantMessage]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Something went wrong';
      this._error.set(errorMsg);

      // Add error message as assistant response
      const errorMessage: ChatMessage = {
        id: this.generateId(),
        role: 'assistant',
        text: `⚠️ Sorry, I couldn't process your request. ${errorMsg}. Please try again.`,
        timestamp: new Date(),
      };

      this._messages.update(msgs => [...msgs, errorMessage]);
    } finally {
      this._isLoading.set(false);
    }
  }

  clearChat(): void {
    this._messages.set([]);
    this._error.set(null);
  }

  private generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}
