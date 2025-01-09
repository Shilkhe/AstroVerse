import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanetListComponent } from './components/planets/planets-list/planet-list.component';
import { MoonsListComponent } from './components/moons/moons-list/moons-list.component';
import { SpacecraftsListComponent } from './components/spacecrafts/spacecrafts-list/spacecrafts-list.component';
import { FactsListComponent } from './components/facts/facts-list/facts-list.component';
import { MissionsListComponent } from './components/missions/missions-list/missions-list.component';
import { StarsListComponent } from './components/stars/stars-list/stars-list.component';
import { MembersComponent } from './components/members/members.component';
import { RandomfactComponent } from './components/randomfact/randomfact.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizStartComponent } from './components/quiz/quiz-start/quiz-start.component';
import { QuizEndComponent } from './components/quiz/quiz-end/quiz-end.component';
import { Component } from '@angular/core';
import { PlanetPageComponent } from './components/planets/planets-page/planets-page.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'planets', component:PlanetListComponent},
    {path: 'stars', component:StarsListComponent},
    {path: 'moons', component:MoonsListComponent},
    {path: 'spacecrafts', component:SpacecraftsListComponent},
    {path: 'missions', component:MissionsListComponent},
    {path: 'facts', component:FactsListComponent},
    {path: 'members', component:MembersComponent},
    {path: 'randomFact', component:RandomfactComponent},
    {path: 'quiz', component:QuizComponent},
    {path: 'quiz-start', component: QuizStartComponent},
    {path: 'quiz-end', component: QuizEndComponent},
    { path: 'planets/:id', component: PlanetPageComponent }
];
