import { Component } from '@angular/core';

interface Herb {
  name: string;
  sanskrit: string;
  emoji: string;
  benefits: string[];
  usage: string;
  doshas: string[];
  description: string;
}

@Component({
  selector: 'app-herbs',
  standalone: true,
  imports: [],
  templateUrl: './herbs.html',
  styleUrl: './herbs.css',
})
export class Herbs {
  protected readonly herbs: Herb[] = [
    {
      name: 'Ashwagandha',
      sanskrit: 'Withania somnifera',
      emoji: '🌿',
      description: 'Known as "Indian Ginseng," Ashwagandha is one of the most powerful adaptogenic herbs. It helps the body manage stress and supports overall vitality.',
      benefits: ['Reduces stress & anxiety', 'Boosts energy & stamina', 'Supports restful sleep', 'Enhances cognitive function'],
      usage: 'Take 300-500mg powder with warm milk before bed, or as recommended by a practitioner.',
      doshas: ['Vata', 'Kapha'],
    },
    {
      name: 'Turmeric',
      sanskrit: 'Curcuma longa',
      emoji: '🟡',
      description: 'The golden spice of Ayurveda, Turmeric has been used for thousands of years for its powerful anti-inflammatory and antioxidant properties.',
      benefits: ['Powerful anti-inflammatory', 'Strong antioxidant', 'Supports joint health', 'Promotes radiant skin'],
      usage: 'Add to cooking, golden milk, or take as a supplement. Combine with black pepper for better absorption.',
      doshas: ['Pitta', 'Kapha'],
    },
    {
      name: 'Tulsi (Holy Basil)',
      sanskrit: 'Ocimum tenuiflorum',
      emoji: '🌱',
      description: 'Revered as the "Queen of Herbs" in India, Tulsi is considered sacred and is known for its remarkable healing properties across mind, body, and spirit.',
      benefits: ['Boosts respiratory health', 'Strengthens immunity', 'Reduces stress', 'Purifies blood'],
      usage: 'Brew fresh leaves as tea, add to meals, or chew 3-4 leaves daily on an empty stomach.',
      doshas: ['Vata', 'Kapha'],
    },
    {
      name: 'Triphala',
      sanskrit: 'Three Fruits Formula',
      emoji: '🫐',
      description: 'A synergistic blend of three fruits — Amalaki, Bibhitaki, and Haritaki — Triphala is Ayurveda\'s most celebrated digestive formula, suitable for all doshas.',
      benefits: ['Gentle digestive cleanser', 'Rich in antioxidants', 'Supports eye health', 'Balances all three doshas'],
      usage: 'Mix ½ tsp powder in warm water and drink before bed. Can also be taken as tablets.',
      doshas: ['Vata', 'Pitta', 'Kapha'],
    },
    {
      name: 'Brahmi',
      sanskrit: 'Bacopa monnieri',
      emoji: '🧠',
      description: 'Brahmi is the premier brain tonic in Ayurveda. Named after Brahma, the creator god, it\'s revered for enhancing mental clarity and cognitive function.',
      benefits: ['Enhances memory', 'Improves concentration', 'Reduces anxiety', 'Supports nervous system'],
      usage: 'Take as powder with ghee, as a tea, or in capsule form. Best taken in the morning.',
      doshas: ['Pitta', 'Vata'],
    },
    {
      name: 'Shatavari',
      sanskrit: 'Asparagus racemosus',
      emoji: '🌺',
      description: 'Known as "She who possesses a hundred husbands," Shatavari is the primary rejuvenative tonic for women in Ayurveda, supporting hormonal balance and vitality.',
      benefits: ['Hormonal balance', 'Reproductive health', 'Nourishing & cooling', 'Boosts immunity'],
      usage: 'Take ½ tsp powder with warm milk and a pinch of cardamom, twice daily.',
      doshas: ['Vata', 'Pitta'],
    },
    {
      name: 'Neem',
      sanskrit: 'Azadirachta indica',
      emoji: '🌳',
      description: 'Called the "Village Pharmacy" in India, Neem is a powerful purifier. Every part of the tree has medicinal value, from leaves and bark to seeds and flowers.',
      benefits: ['Purifies blood', 'Clears skin conditions', 'Antibacterial & antifungal', 'Supports dental health'],
      usage: 'Apply neem paste externally or take neem capsules. Neem oil can be used for skin and hair.',
      doshas: ['Pitta', 'Kapha'],
    },
    {
      name: 'Amla',
      sanskrit: 'Emblica officinalis',
      emoji: '🟢',
      description: 'Indian Gooseberry is the richest natural source of Vitamin C and a cornerstone of Ayurvedic rejuvenation therapy. It\'s one of three ingredients in Triphala.',
      benefits: ['Extremely rich in Vitamin C', 'Promotes healthy hair', 'Strengthens immunity', 'Anti-aging properties'],
      usage: 'Eat fresh, as juice, dried, or in powder form with honey. Included in Chyawanprash.',
      doshas: ['Vata', 'Pitta', 'Kapha'],
    },
  ];
}
