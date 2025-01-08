import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";
import { MoonDetails } from "./moon-details";

@Injectable({
    providedIn: 'root'
})
export class MoonService{
    private urlExtension: string = "api/moons";
    constructor(private http: HttpClient){}

    // getMoonDetails(): Observable<MoonDetails[]> {
    //     return this.http.get<MoonDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}`);
    // }
    getMoonDetails(page: number, size: number): Observable<any> {
        return this.http.get<any>(`${HttpConfig.apiUrl}${this.urlExtension}?page=${page}&size=${size}`);
    }
}