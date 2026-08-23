import { Component, signal, computed, inject, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChatService, ChatMessage } from '../../services/chat.service';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css',
})
export class AiChat implements AfterViewChecked {
  private readonly chatService = inject(ChatService);

  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>;

  protected readonly isOpen = signal(false);
  protected readonly inputText = signal('');
  protected readonly hasNewMessage = signal(false);
  private shouldScrollToBottom = false;

  // Expose service signals
  protected readonly messages = this.chatService.messages;
  protected readonly isLoading = this.chatService.isLoading;
  protected readonly error = this.chatService.error;

  protected readonly unreadCount = computed(() => {
    if (this.isOpen()) return 0;
    return this.hasNewMessage() ? 1 : 0;
  });

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  toggleChat(): void {
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      this.hasNewMessage.set(false);
      setTimeout(() => {
        this.scrollToBottom();
        this.focusInput();
      }, 100);
    }
  }

  closeChat(): void {
    this.isOpen.set(false);
  }

  async sendMessage(): Promise<void> {
    const text = this.inputText().trim();
    if (!text || this.isLoading()) return;

    this.inputText.set('');
    this.shouldScrollToBottom = true;

    await this.chatService.sendMessage(text);

    this.shouldScrollToBottom = true;
    if (!this.isOpen()) {
      this.hasNewMessage.set(true);
    }
    this.focusInput();
  }

  onInputChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.inputText.set(textarea.value);
    this.autoResizeTextarea(textarea);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat(): void {
    this.chatService.clearChat();
  }

  formatMessage(text: string): string {
    // Simple markdown-like formatting
    let html = this.escapeHtml(text);

    // Bold: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic: *text*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Bullet points: lines starting with - or •
    html = html.replace(/^[\-•]\s+(.+)$/gm, '<span class="chat-bullet">• $1</span>');

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private scrollToBottom(): void {
    if (this.messagesContainer?.nativeElement) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  private focusInput(): void {
    setTimeout(() => {
      this.messageInput?.nativeElement?.focus();
    }, 50);
  }

  private autoResizeTextarea(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
  }
}
