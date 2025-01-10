import { Component } from '@angular/core';
import { FactDetails } from '../../../model/facts/fact-details';
import { FactService } from '../../../model/facts/fact.service';
import { FactsComponent } from "../facts.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-facts-list',
  imports: [FactsComponent, NgFor],
  templateUrl: './facts-list.component.html',
  styleUrl: './facts-list.component.css'
})
export class FactsListComponent {
  selectedCategory: string = '';
  filteredFacts: FactDetails[] = [];
  categories: string[] = ['stars', 'planets', 'moons', 'spacecrafts', 'missions'];
  factDetails: FactDetails[] = [];
  page: number = 0;
  size: number = 6;
  totalPages: number = 0;

  constructor(private factService: FactService) {}

  ngOnInit(): void {
    this.fetchFacts();
  }

  fetchFacts(): void {
    this.factService.getFactDetails(this.page, this.size, this.selectedCategory).subscribe({
      next: (response) => {
        this.factDetails = response.content;
        this.totalPages = response.totalPages;
        this.applyFilter();
      },
      error: (err) => console.error('Errore nel caricamento dei dati', err)
    });
  }

  applyFilter(): void {
    if (this.selectedCategory) {
      this.filteredFacts = this.factDetails.filter(
        fact => fact.category && fact.category.toLowerCase() === this.selectedCategory
      );
    } else {
      this.filteredFacts = this.factDetails;
    }
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;
    this.page = 0;
    this.fetchFacts();
  }

  trackById(index: number, fact: FactDetails): number {
    return fact.id;
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
