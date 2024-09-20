import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('AuthService: API URL:', this.apiUrl);
  }

  registerUser(userData: any): Observable<any> {
    console.log('AuthService: Registrando usuário com dados:', userData);
    return this.http.post(`${this.apiUrl}/users`, userData).pipe(
      tap(
        response => console.log('AuthService: Resposta da API:', response),
        error => console.error('AuthService: Erro na chamada da API:', error)
      )
    );
  }
}