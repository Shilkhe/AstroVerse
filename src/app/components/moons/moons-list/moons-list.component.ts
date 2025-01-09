import { Component, OnInit } from '@angular/core';
import { MoonDetails } from '../../../model/moons/moon-details';
import { MoonService } from '../../../model/moons/moon-service';
import { Observable } from 'rxjs';
import { MoonsComponent } from "../moons.component";

@Component({
  selector: 'app-moons-list',
  imports: [MoonsComponent],
  templateUrl: './moons-list.component.html',
  styleUrl: './moons-list.component.css'
})
export class MoonsListComponent implements OnInit{
  // moonDetail!: MoonDetails[];
  //  constructor(private moonService: MoonService){
  
  //  }
  // ngOnInit(): void {
  //     let opd: Observable<MoonDetails[]> = this.moonService.getMoonDetails();
  //     opd.subscribe({
  //       next: sts => this.moonDetail = sts,
  //      error: err => console.log(err)
  //    });
  //  }
  moonDetails: MoonDetails[] = [];
  page: number = 0;
  readonly size: number = 6;
  totalPages: number = 0;

  constructor(private moonService: MoonService) {}

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
}

