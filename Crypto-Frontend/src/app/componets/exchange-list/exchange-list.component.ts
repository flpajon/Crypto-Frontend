import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Exchange } from 'src/app/models/exchange/exchange.model';
import { ExchangeService } from 'src/app/services/exchange/exchange.service';

@Component({
  selector: 'app-exchange-list',
  templateUrl: './exchange-list.component.html',
  styleUrls: ['./exchange-list.component.css']
})
export class ExchangeListComponent implements OnInit {

  cargando: Boolean = false

  exchangeList: Exchange[] = []

  constructor(private exchangeService: ExchangeService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getExchange()
  }

  //Se obtienen los 3 exhange con mayor volumen
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
        this.getExchangesIcons(this.exchangeList)
        this.cargando = false
      },
      error: err => {
        console.log(err)
        this.cargando = false
      }
    })
  }

  //Se obtienen los iconos de los exchanges obtenidos anteriormente
  getExchangesIcons(exchangeList: Exchange[]) {
    this.exchangeService.getIconExchangeList().subscribe({
      next: result => {
        exchangeList.forEach(item => {
          const resultFind = result.find(a => a.exchange_id == item.exchange_id)
          item.img = resultFind == undefined ? "" : resultFind.url
        })
      },
      error: err => {
        console.log(err);
        exchangeList.forEach(item => {
          item.img = ""
        })
      }
    })
  }

  //Se cierra el dialog
  close(){
    this.activeModal.close()
  }

}
