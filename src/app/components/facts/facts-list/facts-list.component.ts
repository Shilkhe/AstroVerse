import { Component } from '@angular/core';
import { FactDetails } from '../../../model/facts/fact-details';
import { FactService } from '../../../model/facts/fact.service';
import { Observable } from 'rxjs';
import { FactsComponent } from "../facts.component";

@Component({
  selector: 'app-facts-list',
  imports: [FactsComponent],
  templateUrl: './facts-list.component.html',
  styleUrl: './facts-list.component.css'
})
export class FactsListComponent {
     factDetails!: FactDetails[];
       constructor(private factService: FactService){
      
       }
      ngOnInit(): void {
          let opd: Observable<FactDetails[]> = this.factService.getFactDetails();
          opd.subscribe({
            next: sts => this.factDetails = sts,
           error: err => console.log(err)
         });
       }
}
