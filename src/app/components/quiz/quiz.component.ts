import { Component, OnInit } from '@angular/core';
import { QuizDetails } from '../../model/quiz/quiz-details';
import { QuizService } from '../../model/quiz/quiz-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizData } from '../../model/quiz/quiz-data';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [FormsModule]
})
export class QuizComponent implements OnInit {
  difficulty: string = 'easy';  
  numberOfQuestions: number = 5; 
  quizDetails: QuizDetails[] = [];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {}
  getQuiz(): void {
    this.quizService.getQuiz(this.difficulty, this.numberOfQuestions).subscribe(
      (data: QuizDetails[]) => {
      this.quizDetails = data;
      const qD: QuizData = { quizDetails: this.quizDetails }; 
      this.router.navigate(['/quiz-start'], { state: qD })
        .then(() => console.log('Navigazione completata con successo'))
        .catch((error) => console.error('Errore nella navigazione:', error));
      },
      (error) => {
      console.error('Errore nel recupero delle domande:', error);
      }
    );
  }
}
