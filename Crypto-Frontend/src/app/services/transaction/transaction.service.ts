import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app.constantes';
import { Transaction } from 'src/app/models/transaction/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  simulateBuy(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(AppSettings.API_LOCAL_URL + '/transaction/new' , transaction);
  }
}
