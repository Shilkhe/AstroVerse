import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDetails } from '../../../model/quiz/quiz-details';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { QuizData } from '../../../model/quiz/quiz-data';
import { QuizResultDetails } from '../../../model/quiz/quiz-result-datails';


@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css'], 
  imports:[NgIf,NgFor, NgClass]
})
export class QuizStartComponent implements OnInit {
  navigationState: QuizData;
  quizDetails: QuizDetails[] = []; // array delle domande che all'inizio è vuoto e poi dobbiamo andare a mettere le domande della pagina precedente
  currentQuestionIndex: number = 0; // indice delle domande che ci serve per scorrere le domande
  currentQuestion: QuizDetails | null = null; // domanda corrente che all'inizio è null
  userAnswer: string | null = null; // risposta selezionata dall'utente
  isAnswerCorrect: boolean | null = null; // per sapere se la risposta è corretta
  totalQuestions: number = 0; // totale domande
  correctAnswersCount: number = 0; // contatore delle risposte corrette
  quizCompleted: boolean = false; // flag per indicare il completamento del quiz

  constructor(private router: Router) {
    this.navigationState = <QuizData>this.router.getCurrentNavigation()?.extras.state;//cast non voluto(forzato)
    console.log('Navigazione Stato:', this.navigationState);//settare navigationState come variabile di classe per non perderla!
  }

  ngOnInit(): void {
  
    // Recupera i dati passati tramite lo state: usando navigationState possiamo passare da uno stato all'altro di una componente
    // permettendo così di recuperare le domande ricevute nella pagina di quiz
    if (this.navigationState && this.navigationState.quizDetails) {
      this.quizDetails = this.navigationState.quizDetails;
      this.totalQuestions = this.quizDetails.length; // assegniamo il numero totale delle domande
      this.currentQuestion = this.quizDetails[this.currentQuestionIndex]; // impostiamo la prima domanda
    } else {
      console.error('Nessun quiz disponibile!');
      console.log(this.quizDetails);
    }
  }

  submitAnswer(answer: string): void {
    this.userAnswer = answer; // salviamo la risposta dell'utente
    if (this.currentQuestion) {
      if (this.userAnswer === this.currentQuestion.correctAnswer) {
        this.isAnswerCorrect = true; // risposta corretta
        this.correctAnswersCount++; // incrementiamo il contatore delle risposte corrette
      } else {
        this.isAnswerCorrect = false; // risposta sbagliata
      }
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++; // passiamo alla domanda successiva
      this.currentQuestion = this.quizDetails[this.currentQuestionIndex]; // aggiorniamo la domanda corrente
      this.userAnswer = null; // resettiamo la risposta dell'utente
      this.isAnswerCorrect = null; // resettiamo il risultato
    } else {
      // quando il quiz è completato, passiamo alla componente quiz-end
      this.quizCompleted = true;
      const qRD: QuizResultDetails = {totalQuestion: this.totalQuestions, correctAnswerCount: this.correctAnswersCount};
      this.router.navigate(['/quiz-end'],{state: qRD} );
    }
  }
}
