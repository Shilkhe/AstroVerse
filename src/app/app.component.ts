import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { RouterModule, RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { SectionService } from './model/sidebar/sidebar-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AstroVerse';
  activeLink: string = ''; // Variable to hold the active link
  authService: any;

  // Method to set the active link
  setActiveLink(link: string): void {
    this.activeLink = link;
  }


  sections: any[] = [{ name: "Planets" }, { pages: "sez 1" }];
  pageId: string | null = null;  // Nullable type for better handling
  expandedSection: string | null = null; // Tiene traccia della sezione attualmente espansa
  isCollapsed: boolean = false;
  sidebarSubscription: Subscription | undefined;
  currentVersion: string | null = null;

  @Input() canEditPage: boolean = true;

  @ViewChildren('pageList') pageLists!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sectionService: SectionService
  ) {

  }

  toggleSidebar() {
    if (document.getElementsByClassName('no-animation').length > 0) {
      for (let i = 0; i < document.getElementsByClassName('no-animation').length; i++) {
        document.getElementsByClassName('no-animation')[i].classList.remove('no-animation');
      }
    }
    this.sectionService.toggleSidebar();
    this.isCollapsed = this.sectionService.getSidebarState();
  }

  async ngOnInit() {

    this.isCollapsed = this.sectionService.getSidebarState();
    // Abbonati ai cambiamenti di stato
    this.sidebarSubscription = this.sectionService.sidebarState$.subscribe((state) => {
      this.isCollapsed = state;
    });

    // Caricamento iniziale

   


  }

  contentHeight: string = '0px';

  toggleSection(sectionId: string) {
    const pages = this.sections.find(section => section['id'] === sectionId)['pages'];
    this.contentHeight = `${pages.length * 40}px`;
    if (this.expandedSection === sectionId) {
      this.contentHeight = '0px';
      this.expandedSection = null; // Chiudi la sezione se già aperta
    } else {

      this.expandedSection = sectionId; // Aggiorna la sezione espansa
    }
  }

  isExpanded(sectionId: string): boolean {
    return this.expandedSection === sectionId; // Ritorna true se la sezione è espansa
  }

  goToView() {
    this.pageId = this.authService.getCurrentPageId();
    if (this.pageId && this.pageId !== 'homepage') {
      this.router.navigate(['/wiki/' + this.pageId]);
    } else if (this.pageId === 'homepage') {
      this.router.navigate(['/wiki']);
    }
  }

  navigateToPage(title: string, event: Event) {
    event.stopPropagation();
    if (window.innerWidth < 768) {
      this.toggleSidebar();
    }
  }

}

