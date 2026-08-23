import { Component, signal, computed, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

interface Remedy {
  name: string;
  category: string;
  doshas: string[];
  ingredients: string;
  howToUse: string;
  benefits: string;
  emoji: string;
}

@Component({
  selector: 'app-remedies',
  standalone: true,
  imports: [],
  templateUrl: './remedies.html',
  styleUrl: './remedies.css',
})
export class Remedies {
  protected readonly activeFilter = signal<string>('All');

  protected readonly categories = ['All', 'Digestion', 'Sleep', 'Immunity', 'Stress', 'Skin', 'Energy', 'Joints', 'Detox', 'Hair'];

  protected readonly remedies: Remedy[] = [
    {
      name: 'Golden Milk (Haldi Doodh)',
      category: 'Immunity',
      doshas: ['Vata', 'Kapha'],
      ingredients: 'Warm milk, turmeric, black pepper, honey, ghee',
      howToUse: 'Drink warm before bed. Add a pinch of black pepper to enhance turmeric absorption.',
      benefits: 'Boosts immunity, reduces inflammation, promotes restful sleep.',
      emoji: '🥛',
    },
    {
      name: 'Triphala Digestive Tonic',
      category: 'Digestion',
      doshas: ['Vata', 'Pitta', 'Kapha'],
      ingredients: 'Triphala powder, warm water',
      howToUse: 'Mix ½ tsp Triphala powder in warm water. Drink before bed or on an empty stomach.',
      benefits: 'Gently cleanses the digestive tract, supports regular elimination, detoxifies.',
      emoji: '🍵',
    },
    {
      name: 'Ashwagandha Sleep Elixir',
      category: 'Sleep',
      doshas: ['Vata', 'Kapha'],
      ingredients: 'Ashwagandha powder, warm milk, nutmeg, honey',
      howToUse: 'Mix ½ tsp Ashwagandha in warm milk with a pinch of nutmeg. Drink 30 min before sleep.',
      benefits: 'Calms the nervous system, reduces anxiety, promotes deep restful sleep.',
      emoji: '🌙',
    },
    {
      name: 'CCF Tea (Cumin-Coriander-Fennel)',
      category: 'Digestion',
      doshas: ['Vata', 'Pitta', 'Kapha'],
      ingredients: 'Cumin seeds, coriander seeds, fennel seeds',
      howToUse: 'Boil equal parts of each seed in water for 5 min. Strain and sip after meals.',
      benefits: 'Aids digestion, reduces bloating, balances all three doshas.',
      emoji: '🫖',
    },
    {
      name: 'Tulsi-Ginger Immunity Brew',
      category: 'Immunity',
      doshas: ['Kapha', 'Vata'],
      ingredients: 'Fresh tulsi leaves, ginger, honey, lemon',
      howToUse: 'Steep tulsi leaves and grated ginger in hot water for 10 min. Add honey and lemon.',
      benefits: 'Strengthens respiratory health, boosts immunity, fights seasonal infections.',
      emoji: '🍃',
    },
    {
      name: 'Brahmi Mind Tonic',
      category: 'Stress',
      doshas: ['Pitta', 'Vata'],
      ingredients: 'Brahmi powder, warm water or ghee',
      howToUse: 'Take ½ tsp Brahmi with warm water or mix into ghee. Use daily in the morning.',
      benefits: 'Enhances memory and concentration, reduces mental fatigue, calms the mind.',
      emoji: '🧠',
    },
    {
      name: 'Neem Face Mask',
      category: 'Skin',
      doshas: ['Pitta', 'Kapha'],
      ingredients: 'Neem powder, turmeric, rose water, honey',
      howToUse: 'Make a paste and apply to face for 15 min. Rinse with lukewarm water.',
      benefits: 'Clears acne, purifies skin, reduces inflammation and excess oil.',
      emoji: '🌸',
    },
    {
      name: 'Chyawanprash Daily Tonic',
      category: 'Immunity',
      doshas: ['Vata', 'Pitta', 'Kapha'],
      ingredients: 'Chyawanprash (Amla-based herbal jam)',
      howToUse: 'Take 1-2 tsp daily in the morning, directly or with warm milk.',
      benefits: 'Rich in Vitamin C, boosts immunity, rejuvenates all body tissues.',
      emoji: '🍯',
    },
    {
      name: 'Cooling Pitta Drink',
      category: 'Energy',
      doshas: ['Pitta'],
      ingredients: 'Coconut water, mint, rose water, fennel',
      howToUse: 'Mix ingredients together and sip throughout the day, especially in warm weather.',
      benefits: 'Cools the body, reduces acidity, refreshes and hydrates.',
      emoji: '🥥',
    },
    {
      name: 'Abhyanga Self-Massage',
      category: 'Stress',
      doshas: ['Vata', 'Pitta', 'Kapha'],
      ingredients: 'Warm sesame oil (Vata), coconut oil (Pitta), or mustard oil (Kapha)',
      howToUse: 'Warm the oil and massage the entire body in long strokes before bathing.',
      benefits: 'Nourishes skin, calms the nervous system, improves circulation and sleep.',
      emoji: '💆',
    },
    {
      name: 'Amla Vitamin C Shot',
      category: 'Energy',
      doshas: ['Vata', 'Pitta', 'Kapha'],
      ingredients: 'Fresh amla juice or powder, warm water, honey',
      howToUse: 'Mix 1 tbsp amla juice in warm water with honey. Drink first thing in the morning.',
      benefits: 'Rich antioxidant, boosts energy, supports healthy hair and skin.',
      emoji: '⚡',
    },
    {
      name: 'Shatavari Women\'s Tonic',
      category: 'Energy',
      doshas: ['Vata', 'Pitta'],
      ingredients: 'Shatavari powder, warm milk, cardamom',
      howToUse: 'Mix ½ tsp Shatavari in warm milk with cardamom. Drink daily.',
      benefits: 'Supports hormonal balance, nourishes reproductive health, promotes vitality.',
      emoji: '🌺',
    },
    {
      name: 'Mahanarayan Joint Oil',
      category: 'Joints',
      doshas: ['Vata', 'Kapha'],
      ingredients: 'Mahanarayan oil or warm sesame oil, camphor',
      howToUse: 'Warm the oil and massage deeply into stiff or aching joints.',
      benefits: 'Relieves joint pain, stiffness, and arthritis symptoms, especially for Vata.',
      emoji: '🦴',
    },
    {
      name: 'CCF Detox Tea',
      category: 'Detox',
      doshas: ['Vata', 'Pitta', 'Kapha'],
      ingredients: 'Cumin, Coriander, Fennel seeds (equal parts)',
      howToUse: 'Boil ½ tsp of each seed in 3 cups water for 10 mins. Strain and sip all day.',
      benefits: 'Gently cleanses the digestive tract, reduces bloating, flushes toxins.',
      emoji: '🍵',
    },
    {
      name: 'Bhringraj Hair Oil',
      category: 'Hair',
      doshas: ['Pitta', 'Vata'],
      ingredients: 'Bhringraj oil or coconut oil infused with amla',
      howToUse: 'Massage into scalp twice a week, leave on overnight or for 1 hour before washing.',
      benefits: 'Promotes hair growth, prevents premature graying, cools the scalp.',
      emoji: '💆',
    },
    {
      name: 'Brahmi Mind Tonic',
      category: 'Stress',
      doshas: ['Vata', 'Pitta', 'Kapha'],
      ingredients: 'Brahmi powder, warm water or milk',
      howToUse: 'Take ½ tsp with warm water before bed or during stressful times.',
      benefits: 'Enhances memory, calms the nervous system, promotes clear thinking.',
      emoji: '🧠',
    },
    {
      name: 'Castor Oil Pack',
      category: 'Detox',
      doshas: ['Vata', 'Kapha'],
      ingredients: 'Organic castor oil, cotton flannel, heating pad',
      howToUse: 'Apply oil to flannel, place on abdomen (liver area), apply heat for 30-45 mins.',
      benefits: 'Stimulates liver detox, relieves constipation, reduces inflammation.',
      emoji: '🌿',
    }
  ];

  private readonly profileService = inject(ProfileService);

  protected readonly filteredRemedies = computed(() => {
    const filter = this.activeFilter();
    const userDosha = this.profileService.savedDosha();
    
    let filtered = this.remedies;
    if (filter !== 'All') {
      filtered = this.remedies.filter(r => r.category === filter);
    }

    if (userDosha) {
      const userDoshaCapitalized = userDosha.charAt(0).toUpperCase() + userDosha.slice(1);
      // Sort so remedies matching user's dosha come first
      filtered = [...filtered].sort((a, b) => {
        const aMatches = a.doshas.includes(userDoshaCapitalized) ? 1 : 0;
        const bMatches = b.doshas.includes(userDoshaCapitalized) ? 1 : 0;
        return bMatches - aMatches;
      });
    }

    return filtered;
  });

  setFilter(category: string) {
    this.activeFilter.set(category);
  }
}
