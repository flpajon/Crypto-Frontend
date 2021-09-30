import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Asset } from 'src/app/models/asset/asset.model';
import { Exchange } from 'src/app/models/exchange/exchange.model';
import { AssetService } from 'src/app/services/assets/asset.service';
import { ExchangeListComponent } from '../exchange-list/exchange-list.component';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {

  cargando: Boolean = false

  assetList: Asset[] = []

  constructor(private assetService: AssetService, private dialog: NgbModal) { }

  ngOnInit(): void {
    this.getAssets()
  }

  //Se obtienen los 5 assets con mayor volumen_1mth_usd 
  //o bien el total de assets en el caso de que la api devuelva menos de 5 resultados.
  getAssets() {
    this.cargando = true
    this.assetService.getAssetList().subscribe({
      next: result => {
        const limitOfAssets = result.length <= 5 ? result.length : 5
        this.assetList = result.sort((a, b) => (a.volume_1mth_usd < b.volume_1mth_usd ? 11 : -1)).slice(0, limitOfAssets)
        this.getAssetsIcons(this.assetList)
        this.cargando = false
      },
      error: err => {
        console.log(err);
        this.cargando = false
      }
    })
  }

  //Se obtienen las imagenes de los 5 assets obtenidos antoriormente.
  getAssetsIcons(assetList: Asset[]) {
    this.assetService.getAssetListIcons().subscribe({
      next: result => {
        assetList.forEach(item => {
          const resultFind = result.find(a => a.asset_id == item.asset_id)
          item.img = resultFind == undefined ? "" : resultFind.url
        })
      },
      error: err => {
        console.log(err);
        assetList.forEach(item => {
          item.img = ""
        })
      }
    })
  }

  //Se obtienen los 3 exchage con mas volumen y sus imagenes para mostrarlos en un dialog
  showExchange() {
    this.dialog.open(ExchangeListComponent, {
      animation: true,
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
      centered: true
    });
  }
}



