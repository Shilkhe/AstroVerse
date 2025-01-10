import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuizDetails} from '../../../model/quiz/quiz-details';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {QuizData} from '../../../model/quiz/quiz-data';
import {QuizResultDetails} from '../../../model/quiz/quiz-result-datails';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css'],
  imports: [NgIf, NgFor, NgClass]
})
export class QuizStartComponent implements OnInit {
  navigationState: QuizData;
  quizDetails: QuizDetails[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: QuizDetails | null = null;
  userAnswer: string | null = null;
  isAnswerCorrect: boolean | null = null;
  totalQuestions: number = 0;
  correctAnswersCount: number = 0;
  quizCompleted: boolean = false;

  constructor(private router: Router) {
    this.navigationState = <QuizData>this.router.getCurrentNavigation()?.extras.state;
    console.log('Navigazione Stato:', this.navigationState);
  }

  ngOnInit(): void {
    if (this.navigationState && this.navigationState.quizDetails) {
      this.quizDetails = this.navigationState.quizDetails;
      this.totalQuestions = this.quizDetails.length;
      this.currentQuestion = this.quizDetails[this.currentQuestionIndex];
    } else {
      console.error('Nessun quiz disponibile!');
      console.log(this.quizDetails);
    }
  }

  submitAnswer(answer: string): void {
    this.userAnswer = answer;
    if (this.currentQuestion) {
      if (this.userAnswer === this.currentQuestion.correctAnswer) {
        this.isAnswerCorrect = true;
        this.correctAnswersCount++;
      } else {
        this.isAnswerCorrect = false;
      }
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.quizDetails[this.currentQuestionIndex];
      this.userAnswer = null;
      this.isAnswerCorrect = null;
    } else {
      this.quizCompleted = true;
      const qRD: QuizResultDetails = {totalQuestion: this.totalQuestions, correctAnswerCount: this.correctAnswersCount};
      this.router.navigate(['/quiz-end'], {state: qRD});
    }
  }
}
