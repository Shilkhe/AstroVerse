import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpConfig } from "../../config/http-config";
import { FactDetails } from "./fact-details";

@Injectable({
  providedIn: 'root'
})
export class FactService {
  private urlExtension: string = "api/facts";
  constructor(private http: HttpClient) {}

  getRandomFact(): Observable<FactDetails> {
    return this.http.get<FactDetails>(`${HttpConfig.apiUrl}${this.urlExtension}/random`);
  }

  getFactDetails(page: number, size: number, category: string): Observable<any> {
    let url = `${HttpConfig.apiUrl}${this.urlExtension}?page=${page}&size=${size}`;
    if (category) {
      url += `&category=${category}`;
    }
    console.log('Request URL:', url);
    return this.http.get<any>(url);
  }
}