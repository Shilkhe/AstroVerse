import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FactDetails } from '../model/facts/fact-details';
import { FactService } from '../model/facts/fact.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentFact: FactDetails = {
    id: 0,
    text: 'Loading fascinating space fact...',
    category: 'space'
  };

  constructor(private factService: FactService) {}

  ngOnInit() {
    this.loadNewFact();
  }

  loadNewFact() {
    this.factService.getRandomFact().subscribe({
      next: (fact) => {
        this.currentFact = fact;
      },
      error: (error) => {
        console.error('Error loading fact:', error);
        this.currentFact = {
          id: 0,
          text: 'Unable to load fact. Please try again.',
          category: 'error'
        };
      }
    });
  }
}