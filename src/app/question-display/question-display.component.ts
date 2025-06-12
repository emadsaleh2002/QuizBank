import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent {
  questions: any[] = [];
  selectedAnswers: { [key: number]: string } = {};
  correctAnswers: { [key: number]: boolean | null } = {};
  currentIndex = 0;
  totalCorrect = 0;
  showAnswers = false;
  showAnswerButton = true;
  showSubmitButton = true;
  showResults = false;
  isDarkMode = false;

  constructor(private router: Router,private themeService: ThemeService){
    const navigation = this.router.getCurrentNavigation();
    this.questions = navigation?.extras.state?.['questions'] || [];
    console.log(this.questions);
  }

  get correctCount(): number {
    return Object.values(this.correctAnswers).filter(v => v === true).length;
  }

  get wrongCount(): number {
    return Object.values(this.correctAnswers).filter(v => v === false).length;
  }

  get unansweredCount(): number {
    return Object.values(this.correctAnswers).filter(v => v === null).length;
  }

  get correctPercent(): number {
    return this.percentage(this.correctCount);
  }

  get wrongPercent(): number {
    return this.percentage(this.wrongCount);
  }

  get unansweredPercent(): number {
    return this.percentage(this.unansweredCount);
  }

  percentage(count: number): number {
    return this.questions.length ? (count / this.questions.length) * 100 : 0;
  }

  submitAnswers(): void {
    this.showResults = true;
    this.totalCorrect = 0;
    this.showSubmitButton = false;
    console.log(this.selectedAnswers);

    this.questions.forEach((q, i) => {
      const answer = this.selectedAnswers[i]?.trim();
      if (!answer) {
        this.correctAnswers[i] = null;
        return;
      }

      if (['mcq', 'true_false', 'complete'].includes(q.type)) {
        const correct = answer.toLowerCase() === q.correctAnswer.trim().toLowerCase();
        this.correctAnswers[i] = correct;
        if (correct) this.totalCorrect++;
      } else if (q.type === 'Open') {
        this.correctAnswers[i] = null;
      }
    });

    this.currentIndex = 0;
  }

  next(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  first(): void {
    this.currentIndex = 0;
  }

  last(): void {
    this.currentIndex = this.questions.length - 1;
  }

  ShowAnswers(): void {
    this.showAnswers = true;
    this.showAnswerButton = false;
  }

  get isPreviousDisabled(): boolean {
    return this.currentIndex === 0;
  }

  get isNextDisabled(): boolean {
    return this.currentIndex === this.questions.length - 1;
  }
  ngOnInit() {
    this.themeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });
  }

}
