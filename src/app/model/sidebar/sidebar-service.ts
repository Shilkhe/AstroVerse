import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SectionService {
    loadSections() {
      throw new Error('Method not implemented.');
    }
    private localStorageKey = 'sidebarCollapsed'; // Chiave in localStorage

    private collapsedSubject = new BehaviorSubject<boolean>(this.getSidebarState()); // Inizializza con lo stato salvato

    // Observable per abbonarsi
    sidebarState$ = this.collapsedSubject.asObservable();

    private versionSubject = new BehaviorSubject<string>('V3'); // Default version
    version$ = this.versionSubject.asObservable();


    // loadSections(): Observable<any[]> {
    //     const version = this.versionSubject.getValue();

    //     if (version === 'V3') {
    //         const sectionsRef = collection(this.firestore, 'sections');
    //         return collectionData(sectionsRef, { idField: 'id' }) as Observable<any[]>;
    //     } else if (version === 'V4') {
    //         const sectionsRef = collection(this.firestore, 'sectionsv4');
    //         return collectionData(sectionsRef, { idField: 'id' }) as Observable<any[]>;
    //     }

    //     return of([]);
    // }

    getSidebarState(): boolean {
        const state = localStorage.getItem(this.localStorageKey); // Usa la chiave corretta
        return state ? JSON.parse(state) : true; // Ritorna lo stato da localStorage o false di default
    }

    toggleSidebar(): void {
        // Inverte lo stato della sidebar
        this.collapsedSubject.next(!this.collapsedSubject.value);
        // Salva lo stato nel localStorage
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.collapsedSubject.value));
    }

    // Forza un determinato stato della sidebar (collassato o espanso)
    setSidebarState(collapsed: boolean): void {
        this.collapsedSubject.next(collapsed); // Informa il BehaviorSubject del nuovo stato
        localStorage.setItem(this.localStorageKey, JSON.stringify(collapsed)); // Salva il nuovo stato nel localStorage
    }

    switchVersion(newVersion: string): void {
        localStorage.setItem('version', newVersion);
        this.versionSubject.next(newVersion);
    }

}