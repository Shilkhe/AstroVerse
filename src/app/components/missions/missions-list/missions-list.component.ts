import { Component, OnInit } from '@angular/core';
import { MissionDetails } from '../../../model/missions/mission-details';
import { MissionService } from '../../../model/missions/mission-service';
import { Observable } from 'rxjs';
import { MissionsComponent } from "../missions.component";

@Component({
  selector: 'app-missions-list',
  imports: [MissionsComponent],
  templateUrl: './missions-list.component.html',
  styleUrl: './missions-list.component.css'
})
export class MissionsListComponent implements OnInit {
    // missionDetails!: MissionDetails[];
    //  constructor(private missionService: MissionService){
    
    //  }
    // ngOnInit(): void {
    //     let opd: Observable<MissionDetails[]> = this.missionService.getMissionDetails();
    //     opd.subscribe({
    //       next: sts => this.missionDetails = sts,
    //      error: err => console.log(err)
    //    });
    //  }
    missionDetails: MissionDetails[] = [];
    page: number = 0;
    readonly size: number = 6;
    totalPages: number = 0;

    constructor(private missionService: MissionService) {}

    ngOnInit(): void {
        this.loadMissions();
    }

    private loadMissions(): void {
        this.missionService.getMissionDetails(this.page, this.size).subscribe({
            next: (response) => this.updateMissions(response.content, response.totalPages),
            error: (err) => this.handleError(err)
        });
    }

    private updateMissions(missions: MissionDetails[], totalPages: number): void {
        this.missionDetails = missions;
        this.totalPages = totalPages;
    }

    private handleError(error: any): void {
        console.error('Errore nel caricamento dei dati', error);
    }

    nextPage(): void {
        if (this.page < this.totalPages - 1) {
            this.page++;
            this.loadMissions();
        }
    }

    prevPage(): void {
        if (this.page > 0) {
            this.page--;
            this.loadMissions();
        }
    }

    isFirstPage(): boolean {
        return this.page === 0;
    }

    isLastPage(): boolean {
        return this.page >= this.totalPages - 1;
    }
}
