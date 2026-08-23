import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DoshaQuiz } from './pages/dosha-quiz/dosha-quiz';
import { Remedies } from './pages/remedies/remedies';
import { Herbs } from './pages/herbs/herbs';
import { DailyRoutine } from './pages/daily-routine/daily-routine';
import { SymptomChecker } from './pages/symptom-checker/symptom-checker';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'AyurvedaDaily — Discover Your Natural Balance',
  },
  {
    path: 'dosha-quiz',
    component: DoshaQuiz,
    title: 'Dosha Quiz — AyurvedaDaily',
  },
  {
    path: 'remedies',
    component: Remedies,
    title: 'Ayurvedic Remedies — AyurvedaDaily',
  },
  {
    path: 'herbs',
    component: Herbs,
    title: 'Ayurvedic Herbs Guide — AyurvedaDaily',
  },
  {
    path: 'daily-routine',
    component: DailyRoutine,
    title: 'Daily Routine (Dinacharya) — AyurvedaDaily',
  },
  {
    path: 'symptom-checker',
    component: SymptomChecker,
    title: 'Symptom Checker — AyurvedaDaily',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
