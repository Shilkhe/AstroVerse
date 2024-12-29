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

    getPlanetDetails(): Observable<PlanetDetails[]> {
        return this.http.get<PlanetDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}`);
    }
}