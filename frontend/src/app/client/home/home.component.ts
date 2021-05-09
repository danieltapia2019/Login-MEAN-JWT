import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user
  public fecha 
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkToken()
    this.getUser()
    this.fecha  = this.getFecha()
  }

  //obtenemos los datos del usuario desde el token
  getUser(){
    const token = localStorage.getItem('token')
    let payload = token.split('.')[1]
    payload = window.atob(payload)
    this.user = JSON.parse(payload)
    console.log(this.user)

  }

  getFecha(){
    let meses = [
      "Enero", "Febrero", "Marzo",
      "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre",
      "Noviembre", "Diciembre"
    ]
    let fecha = new Date()
    let dia = fecha.getDate()
    let mes = meses[fecha.getMonth()]
    let año = fecha.getFullYear()
    return  dia+" de "+mes+" de "+año
  }

}
