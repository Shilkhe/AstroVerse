import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SearchDetails } from "./search-details";
import { HttpConfig } from "../../config/http-config";

@Injectable({
    providedIn: 'root'
})
export class SearchService{
    private urlExtension: string = "api/search";
    constructor(private http: HttpClient){}
    searchDetails: SearchDetails | null = null;
    getSearchDetails(keyword: string): Observable<SearchDetails[]> {
        return this.http.get<SearchDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}/${keyword}`);
    }
}