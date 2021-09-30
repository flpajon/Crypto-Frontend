import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cargando: Boolean = false

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isloggedIn()
  }

  //Se valida si el usuario esta autenticado, si existen datos en el localstorage
  //es porq si, en caso contrario se redirecciona al login
  isloggedIn() {
    this.cargando = true
    var userInfo = localStorage.getItem('datos') || "";
    if (userInfo.length == 0) {
      this.cargando = false
      this.router.navigate(['login'])
    }
  }

}
