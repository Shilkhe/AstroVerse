import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";
import { MissionDetails } from "./mission-details";


@Injectable({
    providedIn: 'root'
})
export class MissionService{
    private urlExtension: string = "api/missions";
    constructor(private http: HttpClient){}

    // getMissionDetails(): Observable<MissionDetails[]> {
    //     return this.http.get<MissionDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}`);
    // }
    getMissionDetails(page: number, size: number): Observable<any> {
        return this.http.get<any>(`${HttpConfig.apiUrl}${this.urlExtension}?page=${page}&size=${size}`);
    }
    getMissionById(id: number): Observable<MissionDetails> {
            return this.http.get<MissionDetails>(`${HttpConfig.apiUrl}${this.urlExtension}/${id}`);
        }
}