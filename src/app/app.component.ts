import {Component} from '@angular/core';
import {RouterModule,RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='AstroVerse';
  activeLink:string='';

  setActiveLink(link:string):void {
    this.activeLink=link;
  }
  isClosed=false;

  toggleSidebar() {
    this.isClosed=!this.isClosed;
  }
}
