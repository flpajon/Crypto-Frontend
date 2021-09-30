import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetListComponent } from './componets/asset-list/asset-list.component';
import { BuySimulatorComponent } from './componets/buy-simulator/buy-simulator.component';
import { HomeComponent } from './componets/home/home.component';
import { LogInComponent } from './componets/log-in/log-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'assets-list',
        pathMatch: 'full'
      },
      {
        path: 'assets-list',
        component: AssetListComponent
      },
      {
        path: 'buy-simulator',
        component: BuySimulatorComponent
      },
      {
        path: 'login',
        component: LogInComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
