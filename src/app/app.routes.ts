import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanetsComponent } from './components/planets/planets.component';
import { StarsComponent } from './components/stars/stars.component';
import { MoonsComponent } from './components/moons/moons.component';
import { SpacecraftsComponent } from './components/spacecrafts/spacecrafts.component';
import { MissionsComponent } from './components/missions/missions.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'planets', component:PlanetsComponent},
    {path: 'stars', component:StarsComponent},
    {path: 'moons', component:MoonsComponent},
    {path: 'spacecrafts', component:SpacecraftsComponent},
    {path: 'missions', component:MissionsComponent}
];
