import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SpacecraftDetails } from '../../model/spacecrafts/spacecraft-details';

@Component({
  selector: 'app-spacecrafts',
  imports: [],
  templateUrl: './spacecrafts.component.html',
  styleUrl: './spacecrafts.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SpacecraftsComponent {
   @Input({
      required: true
    })
    spacecraft: SpacecraftDetails | null = null;
  }

