import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";
import { StarDetails } from "./star-details";

@Injectable({
    providedIn: 'root'
})
export class StarService{
    private urlExtension:string="api/stars";
    constructor(private http:HttpClient){}
    getStarDetails():Observable<StarDetails[]>{
        return this.http.get<StarDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}`);
    }
    getStarById(id:number):Observable<StarDetails>{
        return this.http.get<StarDetails>(`${HttpConfig.apiUrl}${this.urlExtension}/${id}`);
    }
}