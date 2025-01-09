import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SpacecraftDetails } from '../../../model/spacecrafts/spacecraft-details';
import { SpacecraftService } from '../../../model/spacecrafts/spacecraft-service';

@Component({
  selector: 'app-spacecrafts-page',
  imports: [NgIf],
  templateUrl: './spacecrafts-page.component.html',
  styleUrl: './spacecrafts-page.component.css'
})
export class SpacecraftsPageComponent implements OnInit {
  spacecrafts: SpacecraftDetails | null = null;
  iframeUrl: SafeResourceUrl | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private spacecraftservice: SpacecraftService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Recupera l'id dalla route
    if (id) {
      this.spacecraftservice.getSpacecraftById(+id).subscribe({
        next: (data) => {
          this.spacecrafts = data;
          if (this.spacecrafts?.name) {
            const baseURL = 'https://eyes.nasa.gov/apps/solar-system/#/sc';
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `${baseURL}${this.spacecrafts.name.toLowerCase()}`
            );
          }
        },
        error: (error) => {
          this.errorMessage = 'Planet not found or an error occurred.';
        },
      });
    }
  }


}
