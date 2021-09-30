import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResult } from 'src/app/models/auth-result/auth-result.model';
import { LogInService } from 'src/app/services/log-in/log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  cargando: Boolean = false

  user: String = ""
  password: String = ""

  authResult!: AuthResult;

  constructor(private loginService: LogInService, private router: Router) { }
  ngOnInit(): void {
    this.isloggedIn()
  }

  //Se valida si el usuario esta autenticado, si existen datos en el localstorage
  //es porq si y se redirecciona al home
  isloggedIn() {
    this.cargando = true
    var userInfo = localStorage.getItem('datos') || "";
    if (userInfo.length != 0) {
      this.cargando = false
      this.router.navigate(['home'])
    }
    this.cargando = false
  }

  //Se envia el usuario y contraseña al servidor para autenticarse
  logIn() {
    if (this.validateFields()) {
      this.cargando = true
      this.loginService.logIn(this.user.trim(), this.password.trim()).subscribe({
        next: result => {
          this.authResult = result
          localStorage.setItem('datos', JSON.stringify(this.authResult));
          this.router.navigate(['home']);
          this.cargando = false
        },
        error: err => {
          if (err.status == 400) {
            alert(err.error)
            console.log(err.status);
          } else {
            console.log("Ocurrio un problema en el servidor.");
          }
          this.cargando = false
        }
      })
    } else {
      alert("Complete todos los campos para continuar.")
    }
  }

  //Se validan que los campos no esten vacios
  validateFields(): Boolean {
    if (this.user == null || this.user.trim().length == 0) {
      return false
    }
    if (this.password == null || this.password.trim().length == 0) {
      return false
    }
    return true
  }
}


