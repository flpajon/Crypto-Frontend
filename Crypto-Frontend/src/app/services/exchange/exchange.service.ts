import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app.constantes';
import { ExchangeIcon } from 'src/app/models/exchange-icon/exchange-icon.model';
import { Exchange } from 'src/app/models/exchange/exchange.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http: HttpClient) { }

  getExchangeList(): Observable<Exchange[]> {
    return this.http.get<Exchange[]>(AppSettings.API_CRYPTO_URL + '/v1/exchanges?apikey=' + AppSettings.API_CRYPTO_KEY);
  }

  getIconExchangeList(): Observable<ExchangeIcon[]> {
    return this.http.get<ExchangeIcon[]>(AppSettings.API_CRYPTO_URL + '/v1/exchanges/icons/512?apikey=' + AppSettings.API_CRYPTO_KEY);
  }

}
