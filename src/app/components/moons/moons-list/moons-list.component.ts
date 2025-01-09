import { Component, OnInit } from '@angular/core';
import { MoonDetails } from '../../../model/moons/moon-details';
import { MoonService } from '../../../model/moons/moon-service';
import { MoonsComponent } from "../moons.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-moons-list',
  imports: [MoonsComponent],
  templateUrl: './moons-list.component.html',
  styleUrl: './moons-list.component.css'
})
export class MoonsListComponent implements OnInit {
  moonDetails: MoonDetails[] = [];
  page: number = 0;
  readonly size: number = 6;
  totalPages: number = 0;

  constructor(private moonService: MoonService, private router: Router) {}

  ngOnInit(): void {
    this.loadMoons();
  }

  private loadMoons(): void {
    this.moonService.getMoonDetails(this.page, this.size).subscribe({
      next: (response) => this.updateMoons(response.content, response.totalPages),
      error: (err) => this.handleError(err)
    });
  }

  private updateMoons(moons: MoonDetails[], totalPages: number): void {
    this.moonDetails = moons;
    this.totalPages = totalPages;
  }

  private handleError(error: any): void {
    console.error('Errore nel caricamento dei dati', error);
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadMoons();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadMoons();
    }
  }

  isFirstPage(): boolean {
    return this.page === 0;
  }

  isLastPage(): boolean {
    return this.page >= this.totalPages - 1;
  }

  getMoon(id: number): void {
    this.router.navigate([`/moons-page/${id}`]);
  }
}
