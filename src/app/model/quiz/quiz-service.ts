import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QuizDetails } from "./quiz-details";
import { HttpConfig } from "../../config/http-config";

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private urlExtension: string = "api/quiz";

    constructor(private http: HttpClient) {}

    getQuiz(level: string, range: number): Observable<QuizDetails[]> {
        return this.http.get<QuizDetails[]>(`${HttpConfig.apiUrl}${this.urlExtension}?difficulty=${level}&range=${range}`);
    }
}
