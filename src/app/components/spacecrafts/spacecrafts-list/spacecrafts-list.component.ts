import { Component, OnInit } from '@angular/core';
import { SpacecraftDetails } from '../../../model/spacecrafts/spacecraft-details';
import { SpacecraftService } from '../../../model/spacecrafts/spacecraft-service';
import { Observable } from 'rxjs';
import { SpacecraftsComponent } from "../spacecrafts.component";

@Component({
  selector: 'app-spacecrafts-list',
  imports: [SpacecraftsComponent],
  templateUrl: './spacecrafts-list.component.html',
  styleUrl: './spacecrafts-list.component.css'
})
export class SpacecraftsListComponent implements OnInit{
   spacecraftDetails!: SpacecraftDetails[];
   constructor(private spacecraftService: SpacecraftService){
  
   }
  ngOnInit(): void {
      let opd: Observable<SpacecraftDetails[]> = this.spacecraftService.getSpacecraftDetails();
      opd.subscribe({
        next: sts => this.spacecraftDetails = sts,
       error: err => console.log(err)
     });
   }
}
