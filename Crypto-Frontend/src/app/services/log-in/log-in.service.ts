import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app.constantes';
import { AuthResult } from 'src/app/models/auth-result/auth-result.model';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) { }

  logIn(user: String, password: String): Observable<AuthResult> {
    return this.http.get<AuthResult>(AppSettings.API_LOCAL_URL + '/session/login?user=' + user + '&password=' + password);
  }
}
