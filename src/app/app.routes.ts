import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanetsComponent } from './components/planets/planets.component';
import { StarsComponent } from './components/stars/stars.component';
import { MoonsComponent } from './components/moons/moons.component';
import { SpacecraftsComponent } from './components/spacecrafts/spacecrafts.component';
import { MissionsComponent } from './components/missions/missions.component';
import { PlanetListComponent } from './components/planets/planets-list/planet-list.component';
import { MoonsListComponent } from './components/moons/moons-list/moons-list.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'planets', component:PlanetListComponent},
    {path: 'stars', component:StarsComponent},
    {path: 'moons', component:MoonsListComponent},
    {path: 'spacecrafts', component:SpacecraftsComponent},
    {path: 'missions', component:MissionsComponent}
];
