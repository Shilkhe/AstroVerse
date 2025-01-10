import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoonService } from '../../../model/moons/moon-service';
import { MoonDetails } from '../../../model/moons/moon-details';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-moons-page',
  templateUrl: './moons-page.component.html',
  styleUrls: ['./moons-page.component.css'],
  imports: [NgIf]
})
export class MoonsPageComponent implements OnInit {
  moon: MoonDetails | null = null;
  iframeUrl: SafeResourceUrl | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private moonService: MoonService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.moonService.getMoonById(+id).subscribe({
        next: (data) => {
          this.moon = data;
          if (this.moon?.name) {
            const baseURL = 'https://eyes.nasa.gov/apps/solar-system/#/';
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `${baseURL}${this.moon.name.toLowerCase()}`
            );
          }
        },
        error: (error) => {
          this.errorMessage = 'Moon not found or an error occurred.';
        },
      });
    }
  }
}
