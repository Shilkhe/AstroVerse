import { Component, OnInit } from '@angular/core';
import { MissionDetails } from '../../../model/missions/mission-details';
import { NgIf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../../../model/missions/mission-service';

@Component({
  selector: 'app-missions-page',
  imports: [NgIf],
  templateUrl: './missions-page.component.html',
  styleUrl: './missions-page.component.css'
})
export class MissionsPageComponent implements OnInit {
  mission: MissionDetails | null = null;
  iframeUrl: SafeResourceUrl | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private missionService: MissionService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.missionService.getMissionById(+id).subscribe({
        next: (data) => {
          this.mission = data;
        },
        error: (error) => {
          this.errorMessage = 'Planet not found or an error occurred.';
        }
      });
    }
  }
}
