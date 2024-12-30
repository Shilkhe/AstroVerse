import { Component, Input } from '@angular/core';
import { FactDetails } from '../../model/facts/fact-details';

@Component({
  selector: 'app-facts',
  imports: [],
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.css'
})
export class FactsComponent {
@Input({
      required: true
    })
    fact: FactDetails | null = null;
}

