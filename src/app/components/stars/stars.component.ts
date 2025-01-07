import { Component, Input, ViewEncapsulation } from '@angular/core';
import { StarDetails } from '../../model/stars/star-details';

@Component({
  selector: 'app-stars',
  imports: [],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.css',
  encapsulation: ViewEncapsulation.None
})
export class StarsComponent {
   @Input({
        required: true
      })
      star: StarDetails | null = null;
}
