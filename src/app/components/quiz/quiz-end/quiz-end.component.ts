import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizResultDetails } from '../../../model/quiz/quiz-result-datails';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.css']  
})
export class QuizEndComponent {
  totalQuestion: number = 0;
  corectAnswer: number = 0;
  navigationState: QuizResultDetails; 
  endText: string | null = null;

  constructor(private router: Router) {
    this.navigationState = <QuizResultDetails>this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.totalQuestion = this.navigationState.totalQuestion;
    this.corectAnswer = this.navigationState.correctAnswerCount;
    const percentage = (this.corectAnswer / this.totalQuestion) * 100;

    if (percentage < 30) {
      this.endText = "Not good enough...";
    } else if (percentage >= 30 && percentage < 60) {
      this.endText = "Good, but you still have to work on it.";
    } else if (percentage >= 60 && percentage < 90) {
      this.endText = "Excellent, you're doing great!";
    } else if (percentage === 100) {
      this.endText = "Perfect! You are a real astronaut!";
    }
  }

  restart(): void {
    this.router.navigate(['/quiz']);
  }

  goHome(): void {
    this.router.navigate(['']);
  }
}
