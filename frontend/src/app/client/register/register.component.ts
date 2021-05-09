import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Router} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  public errs = ""
  constructor(private authService : AuthService, private router: Router,private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.checkLogged()
    this.initForm()
  }

   //checkeamos si ya hay usuario logueado, redirigimos a home
   checkLogged(){
    if(this.authService.isLogged()) this.router.navigate(['/home'])
  }

  initForm():void {
    this.registerForm = this.fb.group({
      username:['',[Validators.required]],
      email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',[Validators.required]]
    })
  }
  //funcion para agregar la clase invalid a los inputs si hay errores o no cumplen validaciones
  isValidField(campo: string):string{
    const validatedField = this.registerForm.get(campo)
    return (!validatedField.valid && validatedField.touched || this.errs)?'is-invalid':validatedField.touched && this.errs?'is-valid':''
  }
  //registrarse
  register(){
    
    this.authService.signUp(this.registerForm.value).subscribe(
      res=>{
        
        localStorage.setItem('token',res.token)
        this.router.navigate(['/home'])
      },
      err =>{
        this.errs = err.error.message
        setTimeout(()=>this.errs="",2000)
      }

    )
  }
}
