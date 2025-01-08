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
    //  factDetails!: FactDetails[];
    //    constructor(private factService: FactService){
      
    //    }
    //   ngOnInit(): void {
    //       let opd: Observable<FactDetails[]> = this.factService.getFactDetails();
    //       opd.subscribe({
    //         next: sts => this.factDetails = sts,
    //        error: err => console.log(err)
    //      });
    //    }
    factDetails: FactDetails[] = [];
    page: number = 0;
    size: number = 6;
    totalPages: number = 0;

    constructor(private factService: FactService) {}

    ngOnInit(): void {
        this.fetchFacts();
    }

    fetchFacts(): void {
        this.factService.getFactDetails(this.page, this.size).subscribe({
            next: (response) => {
                this.factDetails = response.content;
                this.totalPages = response.totalPages;
            },
            error: (err) => console.error('Errore nel caricamento dei dati', err)
        });
    }

    nextPage(): void {
        if (this.page < this.totalPages - 1) {
            this.page++;
            this.fetchFacts();
        }
    }

    prevPage(): void {
        if (this.page > 0) {
            this.page--;
            this.fetchFacts();
        }
    }
}
