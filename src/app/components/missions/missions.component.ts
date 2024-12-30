import { Component, Input } from '@angular/core';
import { MissionDetails } from '../../model/missions/mission-details';

@Component({
  selector: 'app-missions',
  imports: [],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css'
})
export class MissionsComponent {
  @Input({
      required: true
    })
    mission: MissionDetails | null = null;
}
