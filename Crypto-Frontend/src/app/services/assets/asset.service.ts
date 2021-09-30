import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app.constantes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/models/asset/asset.model';
import { AssetIcon } from 'src/app/models/asset-icon/asset-icon.model';
import { AssetRate } from 'src/app/models/asset-rate/asset-rate.model';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  getAssetList(): Observable<Asset[]> {
    return this.http.get<Asset[]>(AppSettings.API_CRYPTO_URL + '/v1/assets?apikey=' + AppSettings.API_CRYPTO_KEY);
  }

  getAssetListIcons(): Observable<AssetIcon[]> {
    return this.http.get<AssetIcon[]>(AppSettings.API_CRYPTO_URL + '/v1/assets/icons/512?apikey=' + AppSettings.API_CRYPTO_KEY);
  }

  getAssetRate(asset_id: String): Observable<AssetRate> {
    return this.http.get<AssetRate>(AppSettings.API_CRYPTO_URL + '/v1/exchangerate/' + asset_id + '/USD?apikey=' + AppSettings.API_CRYPTO_KEY);
  }
}
