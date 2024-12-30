import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanetsComponent } from './components/planets/planets.component';
import { StarsComponent } from './components/stars/stars.component';
import { MoonsComponent } from './components/moons/moons.component';
import { SpacecraftsComponent } from './components/spacecrafts/spacecrafts.component';
import { MissionsComponent } from './components/missions/missions.component';
import { PlanetListComponent } from './components/planets/planets-list/planet-list.component';
import { MoonsListComponent } from './components/moons/moons-list/moons-list.component';
import { SpacecraftsListComponent } from './components/spacecrafts/spacecrafts-list/spacecrafts-list.component';
import { FactsListComponent } from './components/facts/facts-list/facts-list.component';
import { MissionsListComponent } from './components/missions/missions-list/missions-list.component';
import { StarsListComponent } from './components/stars/stars-list/stars-list.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'planets', component:PlanetListComponent},
    {path: 'stars', component:StarsListComponent},
    {path: 'moons', component:MoonsListComponent},
    {path: 'spacecrafts', component:SpacecraftsListComponent},
    {path: 'missions', component:MissionsListComponent},
    {path: 'facts', component:FactsListComponent}
];
