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
  moonDetail!: MoonDetails[];
   constructor(private moonService: MoonService){
  
   }
  ngOnInit(): void {
      let opd: Observable<MoonDetails[]> = this.moonService.getMoonDetails();
      opd.subscribe({
        next: sts => this.moonDetail = sts,
       error: err => console.log(err)
     });
   }
}
