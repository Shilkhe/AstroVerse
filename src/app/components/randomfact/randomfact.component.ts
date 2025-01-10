import { Component, Input, OnInit } from '@angular/core';
import { FactService } from '../../model/facts/fact.service';
import { FactDetails } from '../../model/facts/fact-details';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-randomfact',
  imports: [CommonModule, RouterModule],
  templateUrl: './randomfact.component.html',
  styleUrl: './randomfact.component.css'
})
export class RandomfactComponent implements OnInit {
  @Input({ required: true }) fact: FactDetails | null = null;
  factDetail!: FactDetails;

  constructor(private factService: FactService) {}

  ngOnInit(): void {
    if (this.fact) {
      this.factDetail = this.fact;
    } else {
      this.factService.getRandomFact().subscribe({
        next: sts => this.factDetail = sts,
        error: err => console.log(err)
      });
    }
  }
}
