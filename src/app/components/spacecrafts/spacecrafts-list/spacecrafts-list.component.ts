import { Component, OnInit } from '@angular/core';
import { SpacecraftDetails } from '../../../model/spacecrafts/spacecraft-details';
import { SpacecraftService } from '../../../model/spacecrafts/spacecraft-service';
import { Router } from '@angular/router';
import { SpacecraftsComponent } from "../spacecrafts.component";

@Component({
  selector: 'app-spacecrafts-list',
  imports: [SpacecraftsComponent],
  templateUrl: './spacecrafts-list.component.html',
  styleUrl: './spacecrafts-list.component.css'
})
export class SpacecraftsListComponent implements OnInit {
  spacecraftDetails: SpacecraftDetails[] = [];
  page: number = 0;
  readonly size: number = 6;
  totalPages: number = 0;

  constructor(private spacecraftService: SpacecraftService, private router: Router) {}

  ngOnInit(): void {
    this.loadSpacecrafts();
  }

  private loadSpacecrafts(): void {
    this.spacecraftService.getSpacecraftDetails(this.page, this.size).subscribe({
      next: (response) => this.updateSpacecrafts(response.content, response.totalPages),
      error: (err) => this.handleError(err)
    });
  }

  private updateSpacecrafts(spacecrafts: SpacecraftDetails[], totalPages: number): void {
    this.spacecraftDetails = spacecrafts;
    this.totalPages = totalPages;
  }

  private handleError(error: any): void {
    console.error('Errore nel caricamento dei dati', error);
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadSpacecrafts();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadSpacecrafts();
    }
  }

  isFirstPage(): boolean {
    return this.page === 0;
  }

  isLastPage(): boolean {
    return this.page >= this.totalPages - 1;
  }

  getSpacecrafts(id: number): void {
    this.router.navigate([`/spacecrafts-page/${id}`]);
  }
}
