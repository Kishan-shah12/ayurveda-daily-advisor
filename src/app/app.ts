import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { AiChat } from './components/ai-chat/ai-chat';
import { Feedback } from './components/feedback/feedback';

@Component({
  imports: [RouterOutlet, Navbar, Footer, AiChat, Feedback],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
