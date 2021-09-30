import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResult } from 'src/app/models/auth-result/auth-result.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userInfo!: string
  authResult!: AuthResult 

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadUserInfo()
  }
  
  //Se obtiene la informacion del usuario para mostrar en el dashboard desde el localstorage
  loadUserInfo() {
    this.userInfo = localStorage.getItem('datos') || "";
    if(this.userInfo.length != 0){
      this.authResult = JSON.parse(this.userInfo)
      console.log(this.authResult);
    }
  }

  //Simula un logOut eliminando la informacion del usuario en localstorage
  logOut(){
    localStorage.removeItem('datos');
    this.router.navigate(['login'])
  }
}
