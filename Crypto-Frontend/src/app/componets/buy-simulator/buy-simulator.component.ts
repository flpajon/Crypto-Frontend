import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Asset } from 'src/app/models/asset/asset.model';
import { AuthResult } from 'src/app/models/auth-result/auth-result.model';
import { Exchange } from 'src/app/models/exchange/exchange.model';
import { Transaction } from 'src/app/models/transaction/transaction.model';
import { AssetService } from 'src/app/services/assets/asset.service';
import { ExchangeService } from 'src/app/services/exchange/exchange.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { DialogBuyConfirmComponent } from '../dialog-buy-confirm/dialog-buy-confirm.component';

@Component({
  selector: 'app-buy-simulator',
  templateUrl: './buy-simulator.component.html',
  styleUrls: ['./buy-simulator.component.css']
})
export class BuySimulatorComponent implements OnInit {

  cargando: Boolean = false

  selectedExchange: Exchange = new Exchange()
  selectedAsset: Asset = new Asset()

  assetList: Asset[] = []
  exchangeList: Exchange[] = []
  cantidad: number = 0

  constructor(private router: Router, private dialog: NgbModal, private assetService: AssetService, private exchangeService: ExchangeService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getAssets()
  }

  //Se obtinene los 5 assets con mas volumen para cargalos dentro del select
  getAssets() {
    this.cargando = true
    this.assetService.getAssetList().subscribe({
      next: result => {
        const limitOfAssets = result.length <= 5 ? result.length : 5
        this.assetList = result.sort((a, b) => (a.volume_1mth_usd < b.volume_1mth_usd ? 11 : -1)).slice(0, limitOfAssets)
        this.getExchange()
      },
      error: err => {
        this.cargando = false
        console.log(err)
      }
    })
  }

  //Se obtinene los 5 exchange con mas volumen para cargalos dentro del select
  getExchange() {
    this.exchangeService.getExchangeList().subscribe({
      next: result => {
        const limitOExchange = result.length <= 3 ? result.length : 3
        this.exchangeList = result.sort((a, b) => (a.volume_1mth_usd < b.volume_1mth_usd ? 11 : -1)).slice(0, limitOExchange)
        var commission = 0.25
        for (let index = 0; index < limitOExchange; index++) {
          this.exchangeList[index].commission = commission;
          commission = commission + 0.15
        }
        this.cargando = false
      },
      error: err => {
        console.log(err)
        this.cargando = false
      }
    })
  }

  //Se obtiene el rate del asset seleccionado
  getAssetRate() {
    this.cargando = true
    this.assetService.getAssetRate(this.selectedAsset.asset_id).subscribe({
      next: result => {
        this.selectedAsset.rate = result.rate
        this.cargando = false
      },
      error: err => {
        console.log(err);
        this.cargando = false
      }
    })
  }

  //Se muestra un dialog para mostrar un detalle de la simulacion de compra y de acuerdo al resultado del dialog 
  //(true = confirmado, false = cancelar) se continua.
  simulateBuy() {
    if (this.validateFields()) {
      const dialogRef = this.dialog.open(DialogBuyConfirmComponent, {
        animation: true,
        scrollable: true,
        size: 'lg',
        backdrop: 'static',
        centered: true
      });
      var transaction: Transaction = this.calculateTotalCost()
      dialogRef.componentInstance.transaction = transaction
      dialogRef.result.then(result => {
        if (result) {
          this.cargando = true
          transaction.user = this.getUserNameFromStorage()
          this.transactionService.simulateBuy(transaction).subscribe({
            next: result => {
              alert("Transaccion guardada correctamente.")
              this.cargando = false
              this.router.navigate(['home'])
            },
            error: err => {
              console.log(err);
              this.cargando = false
            }
          })
        } else {
          console.log("CANCELADO")
        }
      })
    }
  }

  //Se obtiene el nombre de usuario guardado en localstorage
  getUserNameFromStorage(): String {
    var username: String = ""
    var userInfo = localStorage.getItem('datos') || "";
    if (userInfo.length != 0) {
      var authResult: AuthResult = JSON.parse(userInfo)
      console.log(authResult);
      username = authResult.user
    }
    return username
  }

  //Se calcula el costo total de la simulacion y se crea el objeto que se enviara al servidor
  calculateTotalCost(): Transaction {
    var transaction: Transaction = new Transaction()
    transaction.asset = this.selectedAsset.name
    transaction.exchange = this.selectedExchange.name
    transaction.unitPrice = this.selectedAsset.rate
    var unitPriceXamount = this.selectedAsset.rate * this.cantidad
    transaction.unitPriceXamount = unitPriceXamount
    var commission = this.selectedExchange.commission * unitPriceXamount
    transaction.commission = commission
    transaction.totalCost = unitPriceXamount + commission
    return transaction

  }

  //Se valida que lo campos no estan vacios
  validateFields(): Boolean {
    if (this.cantidad <= 0 || this.selectedAsset.asset_id == null || this.selectedExchange.exchange_id == null) {
      alert("Complete todos los campos.")
      return false
    }
    return true
  }

  selectedItem(item1: any, item2: any) {
    if (item1 == null || item2 == null) {
      return false;
    }
    return item1 === item2
      ;
  }

}
