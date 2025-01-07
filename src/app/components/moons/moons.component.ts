import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MoonDetails } from '../../model/moons/moon-details';

@Component({
  selector: 'app-moons',
  imports: [],
  templateUrl: './moons.component.html',
  styleUrl: './moons.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MoonsComponent {
    @Input({
      required: true
    })
    moon: MoonDetails | null = null;
  
}
