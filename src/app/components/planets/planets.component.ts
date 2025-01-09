import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PlanetDetails } from '../../model/planets/planet-details';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-planets',
  imports: [RouterModule],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PlanetsComponent {
  @Input({ required: true })
  planet: PlanetDetails | null = null;
}
