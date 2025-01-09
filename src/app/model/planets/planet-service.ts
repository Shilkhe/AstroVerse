import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlanetDetails } from "./planet-details";
import { HttpConfig } from "../../config/http-config";

@Injectable({
    providedIn: 'root'
})
export class PlanetService{
    private urlExtension: string = "api/planets";
    constructor(private http: HttpClient){}
    planetDetails: PlanetDetails | null = null;
    getPlanetDetails(): Observable<PlanetDetails[]> {
        return this.http.get<PlanetDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}`);
    }
    getPlanetById(id: number): Observable<PlanetDetails> {
        return this.http.get<PlanetDetails>(`${HttpConfig.apiUrl}${this.urlExtension}/${id}`);
    }
}