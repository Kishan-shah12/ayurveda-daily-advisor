import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: { text: string; dosha: 'vata' | 'pitta' | 'kapha' }[];
}

interface DoshaResult {
  name: string;
  emoji: string;
  elements: string;
  description: string;
  characteristics: string[];
  tips: string[];
  color: string;
}

@Component({
  selector: 'app-dosha-quiz',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dosha-quiz.html',
  styleUrl: './dosha-quiz.css',
})
export class DoshaQuiz {
  protected readonly currentQuestion = signal(0);
  protected readonly answers = signal<Record<number, 'vata' | 'pitta' | 'kapha'>>({});
  protected readonly quizComplete = signal(false);

  protected readonly questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'How would you describe your body frame?',
      category: 'Body Type',
      options: [
        { text: 'Thin and lean — I find it hard to gain weight', dosha: 'vata' },
        { text: 'Medium and athletic — well-proportioned build', dosha: 'pitta' },
        { text: 'Solid and sturdy — I gain weight easily', dosha: 'kapha' },
      ],
    },
    {
      id: 2,
      question: 'How is your skin typically?',
      category: 'Skin',
      options: [
        { text: 'Dry, rough, or cool to the touch', dosha: 'vata' },
        { text: 'Warm, sensitive, or prone to redness', dosha: 'pitta' },
        { text: 'Smooth, oily, or thick and moist', dosha: 'kapha' },
      ],
    },
    {
      id: 3,
      question: 'How would you describe your digestion?',
      category: 'Digestion',
      options: [
        { text: 'Irregular — sometimes good, sometimes not', dosha: 'vata' },
        { text: 'Strong — I get irritable if I skip meals', dosha: 'pitta' },
        { text: 'Slow and steady — I can skip meals without issue', dosha: 'kapha' },
      ],
    },
    {
      id: 4,
      question: 'How do you handle stress?',
      category: 'Temperament',
      options: [
        { text: 'I become anxious, worried, or overwhelmed', dosha: 'vata' },
        { text: 'I become irritable, frustrated, or critical', dosha: 'pitta' },
        { text: 'I withdraw, avoid conflict, or become lethargic', dosha: 'kapha' },
      ],
    },
    {
      id: 5,
      question: 'What is your sleep pattern like?',
      category: 'Sleep',
      options: [
        { text: 'Light sleeper — I wake up easily and may have trouble falling asleep', dosha: 'vata' },
        { text: 'Moderate — I sleep well but wake up if disturbed', dosha: 'pitta' },
        { text: 'Deep and heavy — I love sleeping and could sleep all day', dosha: 'kapha' },
      ],
    },
    {
      id: 6,
      question: 'How is your energy throughout the day?',
      category: 'Energy',
      options: [
        { text: 'Bursts of energy that come and go quickly', dosha: 'vata' },
        { text: 'Focused and driven until I burn out', dosha: 'pitta' },
        { text: 'Steady and enduring but slow to start', dosha: 'kapha' },
      ],
    },
    {
      id: 7,
      question: 'What type of weather bothers you most?',
      category: 'Climate',
      options: [
        { text: 'Cold, dry, and windy weather', dosha: 'vata' },
        { text: 'Hot and humid weather', dosha: 'pitta' },
        { text: 'Cold, damp, and rainy weather', dosha: 'kapha' },
      ],
    },
    {
      id: 8,
      question: 'How would you describe your mind and thinking style?',
      category: 'Mind',
      options: [
        { text: 'Quick and creative — ideas flow rapidly but I may forget details', dosha: 'vata' },
        { text: 'Sharp and focused — analytical and goal-oriented', dosha: 'pitta' },
        { text: 'Calm and thoughtful — steady, methodical thinker', dosha: 'kapha' },
      ],
    },
    {
      id: 9,
      question: 'What best describes your appetite?',
      category: 'Appetite',
      options: [
        { text: 'Variable — sometimes hungry, sometimes not interested in food', dosha: 'vata' },
        { text: 'Strong — I need regular meals and don\'t like skipping', dosha: 'pitta' },
        { text: 'Moderate — I can eat or wait, food is comforting', dosha: 'kapha' },
      ],
    },
    {
      id: 10,
      question: 'How would friends describe your personality?',
      category: 'Personality',
      options: [
        { text: 'Enthusiastic, talkative, and spontaneous', dosha: 'vata' },
        { text: 'Determined, confident, and natural leader', dosha: 'pitta' },
        { text: 'Loyal, patient, and nurturing', dosha: 'kapha' },
      ],
    },
  ];

  protected readonly totalQuestions = this.questions.length;

  protected readonly progress = computed(() => {
    const answered = Object.keys(this.answers()).length;
    return Math.round((answered / this.totalQuestions) * 100);
  });

  protected readonly doshaResults: Record<string, DoshaResult> = {
    vata: {
      name: 'Vata',
      emoji: '🌬️',
      elements: 'Air & Space',
      color: 'vata',
      description:
        'You are a Vata dominant type! Vata is the energy of movement and creativity. You are imaginative, quick-thinking, and full of ideas. You thrive on variety, new experiences, and creative expression.',
      characteristics: [
        'Creative and quick-minded',
        'Enthusiastic and vibrant',
        'Naturally slender build',
        'Light sleeper with active dreams',
        'Loves warmth and sunshine',
        'Learns quickly, may forget quickly',
      ],
      tips: [
        'Follow a regular daily routine for stability',
        'Eat warm, nourishing, cooked foods',
        'Stay warm and avoid cold, windy environments',
        'Practice grounding activities like yoga and meditation',
        'Get adequate rest — aim for a consistent sleep schedule',
        'Use warming spices like ginger, cinnamon, and cumin',
      ],
    },
    pitta: {
      name: 'Pitta',
      emoji: '🔥',
      elements: 'Fire & Water',
      color: 'pitta',
      description:
        'You are a Pitta dominant type! Pitta is the energy of transformation and digestion. You are focused, ambitious, and naturally confident. You excel at leadership and have a sharp intellect.',
      characteristics: [
        'Sharp intellect and strong focus',
        'Natural leadership qualities',
        'Medium, athletic build',
        'Strong digestion and appetite',
        'Warm body temperature',
        'Goal-oriented and competitive',
      ],
      tips: [
        'Choose cooling foods like cucumbers, melons, and leafy greens',
        'Avoid excessive spicy, sour, and salty foods',
        'Practice moderation — avoid overworking',
        'Spend time in nature, especially near water',
        'Try cooling exercises like swimming or moonlight walks',
        'Use cooling herbs like coriander, fennel, and mint',
      ],
    },
    kapha: {
      name: 'Kapha',
      emoji: '🌍',
      elements: 'Earth & Water',
      color: 'kapha',
      description:
        'You are a Kapha dominant type! Kapha is the energy of structure and stability. You are calm, loyal, and deeply compassionate. You provide stability and support in relationships and have great endurance.',
      characteristics: [
        'Calm, steady temperament',
        'Strong and sturdy build',
        'Excellent long-term memory',
        'Loyal and compassionate',
        'Deep and restful sleeper',
        'Patient and grounded',
      ],
      tips: [
        'Stay active with regular vigorous exercise',
        'Eat light, warm, and spicy foods',
        'Avoid heavy, cold, and oily foods',
        'Wake up early and maintain an active morning routine',
        'Seek new experiences and embrace change',
        'Use stimulating spices like black pepper, turmeric, and ginger',
      ],
    },
  };

  protected readonly result = computed<DoshaResult | null>(() => {
    if (!this.quizComplete()) return null;

    const scores = { vata: 0, pitta: 0, kapha: 0 };
    const ans = this.answers();

    for (const key of Object.keys(ans)) {
      scores[ans[Number(key)]]++;
    }

    const dominant = (Object.keys(scores) as Array<'vata' | 'pitta' | 'kapha'>)
      .reduce((a, b) => (scores[a] >= scores[b] ? a : b));

    return this.doshaResults[dominant];
  });

  protected readonly scores = computed(() => {
    const s = { vata: 0, pitta: 0, kapha: 0 };
    const ans = this.answers();
    for (const key of Object.keys(ans)) {
      s[ans[Number(key)]]++;
    }
    return s;
  });

  selectAnswer(questionId: number, dosha: 'vata' | 'pitta' | 'kapha') {
    this.answers.update(prev => ({ ...prev, [questionId]: dosha }));

    // Auto-advance after a brief delay
    setTimeout(() => {
      if (this.currentQuestion() < this.totalQuestions - 1) {
        this.currentQuestion.update(v => v + 1);
      }
    }, 350);
  }

  goToQuestion(index: number) {
    this.currentQuestion.set(index);
  }

  nextQuestion() {
    if (this.currentQuestion() < this.totalQuestions - 1) {
      this.currentQuestion.update(v => v + 1);
    }
  }

  prevQuestion() {
    if (this.currentQuestion() > 0) {
      this.currentQuestion.update(v => v - 1);
    }
  }

  private readonly profileService = inject(ProfileService);

  submitQuiz() {
    this.quizComplete.set(true);
    
    // Save to profile
    const result = this.result();
    if (result) {
      this.profileService.saveDosha(result.name.toLowerCase() as 'vata' | 'pitta' | 'kapha');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  retakeQuiz() {
    this.answers.set({});
    this.currentQuestion.set(0);
    this.quizComplete.set(false);
    this.profileService.clearProfile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isAnswered(questionId: number): boolean {
    return this.answers()[questionId] !== undefined;
  }

  getSelectedDosha(questionId: number): string | undefined {
    return this.answers()[questionId];
  }

  get allAnswered(): boolean {
    return Object.keys(this.answers()).length === this.totalQuestions;
  }
}
