import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AstroVerse';
  activeLink: string = ''; // Variable to hold the active link

  // Method to set the active link
  setActiveLink(link: string): void {
    this.activeLink = link;
  }
}
