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
    missionDetails!: MissionDetails[];
     constructor(private missionService: MissionService){
    
     }
    ngOnInit(): void {
        let opd: Observable<MissionDetails[]> = this.missionService.getMissionDetails();
        opd.subscribe({
          next: sts => this.missionDetails = sts,
         error: err => console.log(err)
       });
     }
}
