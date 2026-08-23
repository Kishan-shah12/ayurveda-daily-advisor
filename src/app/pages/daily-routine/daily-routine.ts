import { Component, signal, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { RouterLink } from '@angular/router';

interface RoutineBlock {
  time: string;
  period: string;
  emoji: string;
  title: string;
  description: string;
  practices: { name: string; detail: string; emoji: string }[];
  doshaNote?: string;
}

@Component({
  selector: 'app-daily-routine',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './daily-routine.html',
  styleUrl: './daily-routine.css',
})
export class DailyRoutine {
  protected readonly routineBlocks: RoutineBlock[] = [
    {
      time: '6:00 – 8:00 AM',
      period: 'Morning',
      emoji: '🌅',
      title: 'Rise & Rejuvenate',
      description: 'The morning hours are sacred in Ayurveda. Waking before sunrise aligns you with natural rhythms and sets the tone for the entire day.',
      practices: [
        { name: 'Wake Early', detail: 'Rise before or with the sun (ideally before 6 AM). This is the Brahma Muhurta — the most auspicious time for self-care.', emoji: '⏰' },
        { name: 'Tongue Scraping', detail: 'Use a copper or stainless steel scraper to gently cleanse the tongue. This removes toxins (ama) that accumulate overnight.', emoji: '👅' },
        { name: 'Oil Pulling', detail: 'Swish 1 tablespoon of sesame or coconut oil in your mouth for 5-10 minutes. Strengthens teeth, gums, and jaw.', emoji: '🫒' },
        { name: 'Warm Water', detail: 'Drink a glass of warm water with lemon to stimulate digestion and gently flush the system.', emoji: '🍋' },
        { name: 'Morning Movement', detail: 'Practice 15-30 minutes of yoga, stretching, or a brisk walk. Choose intensity based on your dosha.', emoji: '🧘' },
      ],
      doshaNote: 'Vata: gentle yoga & grounding poses. Pitta: moderate, cooling exercises. Kapha: vigorous movement to energize.',
    },
    {
      time: '8:00 – 12:00 PM',
      period: 'Mid-Morning',
      emoji: '☀️',
      title: 'Nourish & Focus',
      description: 'Pitta energy rises as the sun climbs. This is the time for mindful nourishment and focused productive work.',
      practices: [
        { name: 'Balanced Breakfast', detail: 'Eat a warm, nourishing breakfast appropriate for your dosha. Avoid cold, raw foods first thing.', emoji: '🥣' },
        { name: 'Mindful Work', detail: 'Tackle your most demanding mental tasks now. Your focus and clarity are at their peak during this period.', emoji: '💻' },
        { name: 'Herbal Tea', detail: 'Sip on warming herbal teas like ginger, tulsi, or CCF (cumin-coriander-fennel) throughout the morning.', emoji: '🍵' },
        { name: 'Sun Exposure', detail: 'Spend 10-15 minutes in morning sunlight. This supports Vitamin D production and circadian rhythm.', emoji: '🌞' },
      ],
    },
    {
      time: '12:00 – 2:00 PM',
      period: 'Midday',
      emoji: '🌤️',
      title: 'The Main Meal',
      description: 'Agni (digestive fire) is strongest when the sun is highest. Ayurveda recommends making lunch your largest and most substantial meal.',
      practices: [
        { name: 'Largest Meal', detail: 'Eat your biggest meal at midday when digestion is strongest. Include all six tastes: sweet, sour, salty, pungent, bitter, astringent.', emoji: '🍽️' },
        { name: 'Eat Mindfully', detail: 'Sit down, eat without screens, chew thoroughly, and appreciate your food. This dramatically improves digestion.', emoji: '🙏' },
        { name: 'Short Walk', detail: 'Take a gentle 10-15 minute walk after lunch to stimulate digestion. Avoid napping — sit or walk instead.', emoji: '🚶' },
      ],
      doshaNote: 'Vata: warm, oily, grounding foods. Pitta: cooling, less spicy meals. Kapha: light, spiced, less oily dishes.',
    },
    {
      time: '2:00 – 6:00 PM',
      period: 'Afternoon',
      emoji: '🌿',
      title: 'Create & Connect',
      description: 'Vata energy increases in the afternoon. This is an ideal time for creative work, light tasks, and connecting with others.',
      practices: [
        { name: 'Creative Work', detail: 'The afternoon Vata energy supports creativity, communication, and artistic expression.', emoji: '🎨' },
        { name: 'Light Snack', detail: 'If hungry, enjoy a light, warm snack — herbal tea with a few nuts or a piece of fruit.', emoji: '🥜' },
        { name: 'Hydration', detail: 'Drink warm water or herbal tea. Avoid ice-cold beverages as they dampen digestive fire.', emoji: '💧' },
        { name: 'Pranayama', detail: 'Practice 5-10 minutes of breathing exercises (Nadi Shodhana or Ujjayi) to rebalance energy.', emoji: '🌬️' },
      ],
    },
    {
      time: '6:00 – 8:00 PM',
      period: 'Evening',
      emoji: '🌆',
      title: 'Wind Down & Digest',
      description: 'As the sun sets, begin transitioning from activity to rest. A light early dinner gives your body time to digest before sleep.',
      practices: [
        { name: 'Early Light Dinner', detail: 'Eat a lighter meal at least 2-3 hours before bed. Soups, kitchari, and steamed vegetables are ideal.', emoji: '🥗' },
        { name: 'Digital Sunset', detail: 'Start reducing screen time. Dim lights and transition to calmer activities.', emoji: '📵' },
        { name: 'Evening Walk', detail: 'A gentle stroll after dinner aids digestion and helps calm the mind before bed.', emoji: '🌙' },
        { name: 'Self-Care Ritual', detail: 'This is a wonderful time for Abhyanga (self-massage), a warm bath, or journaling.', emoji: '💆' },
      ],
    },
    {
      time: '9:00 – 10:00 PM',
      period: 'Night',
      emoji: '🌙',
      title: 'Rest & Restore',
      description: 'Kapha energy returns in the evening, making it the ideal time for deep, restorative sleep. Aim to be asleep by 10 PM.',
      practices: [
        { name: 'Wind-Down Ritual', detail: 'Practice gentle meditation, gratitude journaling, or read something uplifting (not stimulating).', emoji: '📖' },
        { name: 'Golden Milk', detail: 'Sip warm turmeric milk with a pinch of nutmeg. This traditional drink promotes deep, restful sleep.', emoji: '🥛' },
        { name: 'Early Sleep', detail: 'Aim to sleep by 10 PM. Sleeping during Kapha time (6-10 PM) leads to the deepest, most restorative rest.', emoji: '😴' },
        { name: 'Room Preparation', detail: 'Keep your bedroom cool, dark, and screen-free. A few drops of lavender oil on your pillow can help relaxation.', emoji: '🛏️' },
      ],
      doshaNote: `Vata: keep warm, use heavier blankets. Pitta: keep room cool, cotton sheets. Kapha: don't oversleep — set a consistent wake time.`,
    },
  ];

  protected readonly completedPractices = signal<Record<string, boolean>>({});
  private readonly notificationService = inject(NotificationService);

  constructor() {
    this.loadCompleted();
  }

  private loadCompleted() {
    try {
      const stored = localStorage.getItem('ayurveda_daily_routine');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Reset if it's a new day
        const today = new Date().toDateString();
        if (parsed.date === today) {
          this.completedPractices.set(parsed.practices || {});
        } else {
          this.completedPractices.set({});
          this.saveCompleted();
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  private saveCompleted() {
    try {
      localStorage.setItem('ayurveda_daily_routine', JSON.stringify({
        date: new Date().toDateString(),
        practices: this.completedPractices()
      }));
    } catch (e) {
      // Ignore
    }
  }

  togglePractice(practiceName: string) {
    this.completedPractices.update(prev => {
      const next = { ...prev, [practiceName]: !prev[practiceName] };
      return next;
    });
    this.saveCompleted();
  }

  async setReminder(event: Event, practiceName: string) {
    event.preventDefault();
    event.stopPropagation();
    
    const permission = await this.notificationService.requestPermission();
    if (permission) {
      // Simulate a reminder for demo purposes after 5 seconds
      this.notificationService.scheduleReminder(
        'AyurvedaDaily Reminder',
        `Time for your daily practice: ${practiceName}`,
        5000 
      );
      alert(`Reminder set for: ${practiceName} (demo: will trigger in 5 seconds)`);
    }
  }
}
