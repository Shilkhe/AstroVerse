import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";
import { FactDetails } from "./fact-details";



@Injectable({
    providedIn: 'root'
})
export class FactService{
    private urlExtension: string = "api/facts";
    constructor(private http: HttpClient){}

   // getFactDetails(): Observable<FactDetails[]> {
   //     return this.http.get<FactDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}`);
    //}
    getRandomFact(): Observable<FactDetails>{
        return this.http.get<FactDetails>(`${HttpConfig.apiUrl}${this.urlExtension}/random`);
    }
    //getFactDetails(page: number, size: number): Observable<any> {
    //    return this.http.get<any>(`${HttpConfig.apiUrl}${this.urlExtension}?page=${page}&size=${size}`);
    //}
    
    getFactDetails(page: number, size: number, category: string): Observable<any> {
        let url = `${HttpConfig.apiUrl}${this.urlExtension}?page=${page}&size=${size}`;
        if (category) {
            url += `&category=${category}`;  // Pass the category if selected
        }
        console.log('Request URL:', url);  // Log the URL to ensure it looks correct
        return this.http.get<any>(url);
    }
}