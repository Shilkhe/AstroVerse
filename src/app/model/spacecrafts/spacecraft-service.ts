import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";
import { SpacecraftDetails } from "./spacecraft-details";

@Injectable({
    providedIn: 'root'
})
export class SpacecraftService{
    private urlExtension:string="api/spacecrafts";
    constructor(private http:HttpClient){}
    getSpacecraftDetails(page:number,size:number):Observable<any>{
        return this.http.get<any>(`${HttpConfig.apiUrl}${this.urlExtension}?page=${page}&size=${size}`);
    }
    getSpacecraftById(id:number):Observable<SpacecraftDetails>{
        return this.http.get<SpacecraftDetails>(`${HttpConfig.apiUrl}${this.urlExtension}/${id}`);
    }
}