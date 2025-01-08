import { Component } from '@angular/core';
import { FactDetails } from '../../../model/facts/fact-details';
import { FactService } from '../../../model/facts/fact.service';
import { Observable } from 'rxjs';
import { FactsComponent } from "../facts.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-facts-list',
  imports: [FactsComponent, NgFor],
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
    selectedCategory: string = '';  // Stores the current filter category
    filteredFacts: FactDetails[] = [];  // Stores the filtered facts
    categories: string[] = ['stars', 'planets', 'moons', 'spacecrafts', 'missions'];
    
    factDetails: FactDetails[] = [];
    page: number = 0;
    size: number = 6;
    totalPages: number = 0;
  
    constructor(private factService: FactService) {}
  
    ngOnInit(): void {
      this.fetchFacts();  // Initial fetch
    }
  
    fetchFacts(): void {
      // Pass category to the service to apply the filter on the backend
      this.factService.getFactDetails(this.page, this.size, this.selectedCategory).subscribe({
        next: (response) => {
          this.factDetails = response.content;
          this.totalPages = response.totalPages;  // Update total pages based on the filtered data
          this.applyFilter();  // Apply filter to the fetched data
        },
        error: (err) => console.error('Errore nel caricamento dei dati', err)
      });
    }
  
    applyFilter(): void {
        if (this.selectedCategory) {
            // Ensure you're filtering based on the correct field from your response
            this.filteredFacts = this.factDetails.filter(
                fact => fact.category && fact.category.toLowerCase() === this.selectedCategory
            );
        } else {
            this.filteredFacts = this.factDetails;
        }
    }
  
    onCategoryChange(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;  // Type assertion
      this.selectedCategory = selectElement.value;
      this.page = 0;  // Reset to the first page when changing the category
      this.fetchFacts();  // Fetch facts with the new category
    }
  
    trackById(index: number, fact: FactDetails): number {
      return fact.id;  // Unique identifier for each fact
    }
  
    nextPage(): void {
      if (this.page < this.totalPages - 1) {
        this.page++;
        this.fetchFacts();  // Fetch next page of filtered facts
      }
    }
  
    prevPage(): void {
      if (this.page > 0) {
        this.page--;
        this.fetchFacts();  // Fetch previous page of filtered facts
      }
    }
}
