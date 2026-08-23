import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private permissionGranted = false;

  constructor() {
    this.checkPermission();
  }

  private checkPermission() {
    if (!('Notification' in window)) return;
    this.permissionGranted = Notification.permission === 'granted';
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications.');
      return false;
    }
    
    if (this.permissionGranted) return true;

    try {
      const permission = await Notification.requestPermission();
      this.permissionGranted = permission === 'granted';
      return this.permissionGranted;
    } catch (e) {
      console.error('Error requesting notification permission', e);
      return false;
    }
  }

  scheduleReminder(title: string, body: string, delayMs: number) {
    if (!this.permissionGranted) {
      console.warn('Cannot schedule reminder: Notification permission not granted.');
      return;
    }
    
    // For demo purposes, if delayMs > 1 day, we'll just simulate a quick 5-second reminder
    // so the user can test it immediately without waiting hours.
    const effectiveDelay = delayMs > 86400000 ? 5000 : delayMs;

    setTimeout(() => {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }, effectiveDelay);
  }
}
