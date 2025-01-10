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

  setActiveLink(link:string):void {
    this.activeLink=link;
  }

  sections = [
    {
      id: 'stars',
      name: 'Stars',
      pages: [
        { id: 'sun', title: 'Sun', route: '/stars-page/1' },
        // Add more star pages as needed
      ]
    },
    {
      id: 'planets',
      name: 'Planets',
      pages: [
        { id: 'mercury', title: 'Mercury', route: '/planets-page/1' },
        { id: 'venus', title: 'Venus', route: '/planets-page/2' },
        { id: 'earth', title: 'Earth', route: '/planets-page/3' },
        { id: 'mars', title: 'Mars', route: '/planets-page/4' },
        { id: 'jupiter', title: 'Jupiter', route: '/planets-page/5' },
        { id: 'saturn', title: 'Saturn', route: '/planets-page/6' },
        { id: 'uranus', title: 'Uranus', route: '/planets-page/7' },
        { id: 'neptune', title: 'Neptune', route: '/planets-page/8' },
        { id: 'view-all-planets', title: 'View all...', route: '/planets' },
      ]
    },
    {
      id: 'moons',
      name: 'Moons',
      pages: [
        { id: 'moon', title: 'Moon', route: '/moons-page/1' },
        { id: 'titan', title: 'Titan', route: '/moons-page/8' },
        { id: 'europa', title: 'Europa', route: '/moons-page/5' },
        { id: 'io', title: 'Io', route: '/moons-page/4' },
        { id: 'ganymede', title: 'Ganymede', route: '/moons-page/6' },
        { id: 'amalthea', title: 'Amalthea', route: '/moons-page/11' },
        { id: 'dione', title: 'Dione', route: '/moons-page/17' },
        { id: 'hyperion', title: 'Hyperion', route: '/moons-page/19' },
        { id: 'view-all-moons', title: 'View all...', route: '/moons' },
        // Add more moons
      ]
    },
    {
      id: 'missions',
      name: 'Missions',
      pages: [
        { id: 'apollo', title: 'Apollo Program', route: '/wiki/missions/apollo' },
        { id: 'voyager', title: 'Voyager Program', route: '/wiki/missions/voyager' },
        // Add more missions
      ]
    },
    {
      id: 'spacecrafts',
      name: 'Spacecrafts',
      pages: [
        { id: 'hubble', title: 'Hubble Space Telescope', route: '/wiki/spacecrafts/hubble' },
        { id: 'iss', title: 'International Space Station', route: '/wiki/spacecrafts/iss' },
        // Add more spacecrafts
      ]
    }
  ];
  pageId: string | null = null;  // Nullable type for better handling
  expandedSection: string | null = null; // Tiene traccia della sezione attualmente espansa
  isCollapsed: boolean = false;
  sidebarSubscription: Subscription | undefined;
  currentVersion: string | null = null;

  @Input() canEditPage: boolean = true;

  @ViewChildren('pageList') pageLists!: QueryList<ElementRef>;

  constructor(private router: Router, private route: ActivatedRoute, private sectionService: SectionService) {
    

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

  }

  contentHeight: string = '0px';

  toggleSection(sectionId: string) {
    const section = this.sections.find(section => section.id === sectionId);
    if (section) {
      if (this.expandedSection === sectionId) {
        this.contentHeight = '0px';
        this.expandedSection = null;
      } else {
        this.contentHeight = `${section.pages.length * 40}px`;
        this.expandedSection = sectionId;
      }
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

  navigateToPage(page: any, event: Event) {
    event.stopPropagation();
    this.router.navigate([page.route]);
    if (window.innerWidth < 768) {
      this.toggleSidebar();
    }
  }

}

