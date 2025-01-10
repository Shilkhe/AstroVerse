import {Component,OnInit} from '@angular/core';
import {PlanetsComponent} from '../planets.component';
import {PlanetDetails} from '../../../model/planets/planet-details';
import {PlanetService} from '../../../model/planets/planet-service';
import {Router,RouterModule} from '@angular/router';
import {Observable}from 'rxjs';

@Component({
  selector:'app-planet-list',
  imports:[PlanetsComponent,RouterModule],
  templateUrl:'./planet-list.component.html',
  styleUrl:'./planet-list.component.css'
})
export class PlanetListComponent implements OnInit {
  planetDetail!:PlanetDetails[];
  constructor(private planetService:PlanetService,private router:Router){}

  ngOnInit():void{
    const opd:Observable<PlanetDetails[]>=this.planetService.getPlanetDetails();
    opd.subscribe({
      next:sts=>this.planetDetail=sts,
      error:err=>console.log(err)
    });
  }
  getPlanet(id:number):void{
    this.router.navigate([`/planets-page/${id}`]);
  }
}
