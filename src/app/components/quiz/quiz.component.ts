import { Component, OnInit } from '@angular/core';
import { QuizDetails } from '../../model/quiz/quiz-details';
import { QuizService } from '../../model/quiz/quiz-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports:[FormsModule]
})
export class QuizComponent implements OnInit {
  difficulty: string = 'easy';  
  numberOfQuestions: number = 5; 
  quizDetails: QuizDetails[] = []; //  dove salvo le domande

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {}

  getQuiz(): void {
    this.quizService.getQuiz(this.difficulty, this.numberOfQuestions)
      .subscribe(
        (data: QuizDetails[]) => {  // 'data' è un array di QuizDetails
          this.quizDetails = data;  // Assegniamo l'array di domande
          this.router.navigate(['/quiz-start'], { state: { quizDetails: this.quizDetails } });
        },
        (error) => {
          console.error('Errore nel recupero delle domande:', error);
        }
      );
  }
  
}

