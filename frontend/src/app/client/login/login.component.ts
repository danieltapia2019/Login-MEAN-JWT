import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service'
import { Router} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup

  
  public errs 
  constructor(private authService: AuthService,private router: Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.checkLogged()
    this.initForm()
  }

  //checkeamos si ya hay usuario logueado, redirigimos a home
  checkLogged(){
    if(this.authService.isLogged()) this.router.navigate(['/home'])
  }

  initForm(){
    this.loginForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  //funcion para agregar la clase invalid a los inputs si hay errores o no cumplen validaciones
  isValidField(campo: string):string{
    const validatedField = this.loginForm.get(campo)
    return (!validatedField.valid && validatedField.touched || this.errs)?'is-invalid':validatedField.touched && this.errs?'is-valid':''
  }
  //iniciar sesion
  login(){
    this.authService.signIn(this.loginForm.value).subscribe(
      res=>{
        
        localStorage.setItem('token', res.token)
        this.router.navigate(['/home'])
      },
      err=>{
        this.errs = err.error.message
        setTimeout(()=>this.errs="",2000)
        
      }
    )
  }


}
