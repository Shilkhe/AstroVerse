import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";
import { FactDetails } from "./fact-details";



@Injectable({
    providedIn: 'root'
})
export class MissionService{
    private urlExtension: string = "api/facts";
    constructor(private http: HttpClient){}

    getMissionDetails(): Observable<FactDetails[]> {
        return this.http.get<FactDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}`);
    }
}