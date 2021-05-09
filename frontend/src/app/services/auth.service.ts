import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  miUrl: string = "http://localhost:4000/api/v1/auth/"
  constructor(private http : HttpClient, private router: Router) { }

  //registrar usuario
  signUp(user){
    return this.http.post<any>(this.miUrl+'signUp',user)
  }

  //loguear
  signIn(user){
    return this.http.post<any>(this.miUrl+'signIn',user)
  }

  getUser(){
    let user
    const token = localStorage.getItem('token')
    try {
      let payload = token.split('.')[1]
      payload = window.atob(payload)
      user = JSON.parse(payload)
    } catch (error) {
      
    }
    let payload = token.split('.')[1]
    if(payload){
      
    }else{
      this.router.navigate(['/login'])
    }
  }
  //por si alguien agrega manualmente desde el navegador un token, verificamos que el token sea legitimo
  checkToken(){
    const token = localStorage.getItem('token')
    try {
      let payload = token.split('.')[1]
      payload = window.atob(payload)
      return true
    } catch (error) {
      localStorage.removeItem('token')
      return false
    }
  }
  //checkear si alguien esta logueado
  isLogged(){
    
    return localStorage.getItem('token')&&this.checkToken()?true:false
  }

  //cerrar sesion
  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
  
}
