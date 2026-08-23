import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly doshas = [
    {
      name: 'Vata',
      emoji: '🌬️',
      elements: 'Air & Space',
      color: 'vata',
      description: 'Creative, quick-thinking, and energetic. Vata governs movement, breathing, and the nervous system.',
      qualities: ['Light', 'Cold', 'Dry', 'Mobile'],
    },
    {
      name: 'Pitta',
      emoji: '🔥',
      elements: 'Fire & Water',
      color: 'pitta',
      description: 'Focused, ambitious, and warm-hearted. Pitta governs digestion, metabolism, and transformation.',
      qualities: ['Hot', 'Sharp', 'Light', 'Oily'],
    },
    {
      name: 'Kapha',
      emoji: '🌍',
      elements: 'Earth & Water',
      color: 'kapha',
      description: 'Calm, nurturing, and steady. Kapha governs structure, stability, and lubrication in the body.',
      qualities: ['Heavy', 'Cool', 'Moist', 'Stable'],
    },
  ];

  protected readonly features = [
    {
      emoji: '🌿',
      title: 'Natural Remedies',
      description: 'Time-tested Ayurvedic remedies for common health concerns, from digestive support to stress relief.',
      link: '/remedies',
      linkText: 'Explore Remedies',
    },
    {
      emoji: '🌱',
      title: 'Herb Guide',
      description: 'Discover the healing power of Ayurvedic herbs like Ashwagandha, Turmeric, Tulsi, and more.',
      link: '/herbs',
      linkText: 'Browse Herbs',
    },
    {
      emoji: '🌅',
      title: 'Daily Routine',
      description: 'Build a balanced Dinacharya — an Ayurvedic daily routine for energy, clarity, and calm.',
      link: '/daily-routine',
      linkText: 'Start Your Routine',
    },
  ];
}
