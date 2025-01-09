import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarService } from '../../../model/stars/star-service';
import { StarDetails } from '../../../model/stars/star-details';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-stars-page',
  templateUrl: './stars-page.component.html',
  styleUrls: ['./stars-page.component.css'],
  imports: [NgIf]
})
export class StarsPageComponent implements OnInit {
  star: StarDetails | null = null;
  iframeUrl: SafeResourceUrl | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private starService: StarService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.starService.getStarById(+id).subscribe({
        next: (data) => {
          this.star = data;
          if (this.star?.name) {
            const baseURL = 'https://eyes.nasa.gov/apps/solar-system/#/';
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `${baseURL}${this.star.name.toLowerCase()}`
            );
          }
        },
        error: (error) => {
          this.errorMessage = 'Star not found or an error occurred.';
        },
      });
    }
  }
}
