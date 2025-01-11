import { Component, ElementRef, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { RouterModule, RouterOutlet, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchDetails } from './model/search/search-details';
import { SearchService } from './model/search/search-service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { SectionService } from './model/sidebar/sidebar-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy{

  searchResults: SearchDetails[] = [];
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;
  isLoading = false;
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
        { id: 'voyager1', title: 'Voyager 1', route: '/spacecrafts-page/170' },
        { id: 'voyager2', title: 'Voyager 2', route: '/spacecrafts-page/171' },
        { id: 'iss', title: 'ISS', route: '/spacecrafts-page/64' },
        { id: 'hubble', title: 'Hubble', route: '/spacecrafts-page/58' },
        { id: 'james-webb', title: 'James Webb Telescope', route: '/spacecrafts-page/68' },
        { id: 'juno', title: 'Juno', route: '/spacecrafts-page/73' },
        { id: 'mars-odyssey', title: 'Mars Odyssey', route: '/spacecrafts-page/91' },
        { id: 'jason', title: 'Jason 1', route: '/spacecrafts-page/69' },
        { id: 'view-all-spacecrafts', title: 'View all...', route: '/spacecrafts' },

        // Add more spacecrafts
      ]
    }
  ];
  pageId: string | null = null;  // Nullable type for better handling
  expandedSection: string | null = null; // Tiene traccia della sezione attualmente espansa
  isCollapsed: boolean = false;
  sidebarSubscription: Subscription | undefined;
  currentVersion: string | null = null;
  private destroy$ = new Subject<void>();

  @Input() canEditPage: boolean = true;

  @ViewChildren('pageList') pageLists!: QueryList<ElementRef>;

  constructor(private router: Router, private route: ActivatedRoute, private sectionService: SectionService, private searchService: SearchService) {
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

     // Subscribe to search input changes
     this.searchSubject.pipe(
      takeUntil(this.destroy$),
      debounceTime(500),
      distinctUntilChanged(),
      filter(query => query.length >= 1)
    ).subscribe(query => {
      this.isLoading = true;
      const encodedQuery = query.replace(/\s/g, '%20');
      this.searchService.getSearchDetails(query).subscribe({
        next: (results: SearchDetails[]) => {
          this.searchResults = results;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Search error:', error);
          this.isLoading = false;
        }
      });
    });

    // Subscribe to router events to clear search on navigation
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.clearSearch();
    });
  }

  onSearchInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchSubject.next(query);
  }
  onClick(type: string, id: number) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([`/${type}-page/${id}`]);
    });
  }
  //planets-page/:id
  contentHeight: string = '0px';

  clearSearch() {
    this.searchResults = [];
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
    // Force navigation even if it's the same route
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([page.route]);
    });
    if (window.innerWidth < 768) {
      this.toggleSidebar();
    }
  }
}

