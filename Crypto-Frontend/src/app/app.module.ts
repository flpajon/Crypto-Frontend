import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './componets/log-in/log-in.component';
import { AssetListComponent } from './componets/asset-list/asset-list.component';
import { ExchangeListComponent } from './componets/exchange-list/exchange-list.component';
import { HomeComponent } from './componets/home/home.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './componets/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuySimulatorComponent } from './componets/buy-simulator/buy-simulator.component';
import { DialogBuyConfirmComponent } from './componets/dialog-buy-confirm/dialog-buy-confirm.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    AssetListComponent,
    ExchangeListComponent,
    HomeComponent,
    NavigationComponent,
    BuySimulatorComponent,
    DialogBuyConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
