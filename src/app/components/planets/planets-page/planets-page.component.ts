import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanetService } from '../../../model/planets/planet-service';
import { PlanetDetails } from '../../../model/planets/planet-details';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-planets-page',
  templateUrl: './planets-page.component.html',
  styleUrls: ['./planets-page.component.css'],
  imports: [NgIf]
})
export class PlanetPageComponent implements OnInit {
  planet: PlanetDetails | null = null;
  iframeUrl: SafeResourceUrl | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private planetService: PlanetService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Recupera l'id dalla route
    if (id) {
      this.planetService.getPlanetById(+id).subscribe({
        next: (data) => {
          this.planet = data;
          if (this.planet?.name) {
            const baseURL = 'https://eyes.nasa.gov/apps/solar-system/#/';
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `${baseURL}${this.planet.name.toLowerCase()}`
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
