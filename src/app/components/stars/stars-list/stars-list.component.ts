import { Component, OnInit } from '@angular/core';
import { StarDetails } from '../../../model/stars/star-details';
import { StarService } from '../../../model/stars/star-service';
import { Observable } from 'rxjs';
import { StarsComponent } from "../stars.component";

@Component({
  selector: 'app-stars-list',
  imports: [StarsComponent],
  templateUrl: './stars-list.component.html',
  styleUrl: './stars-list.component.css'
})
export class StarsListComponent implements OnInit {
    starDetails!: StarDetails[];
     constructor(private starService: StarService){
    
     }
    ngOnInit(): void {
        let opd: Observable<StarDetails[]> = this.starService.getStarDetails();
        opd.subscribe({
          next: sts => this.starDetails = sts,
         error: err => console.log(err)
       });
     }
}
