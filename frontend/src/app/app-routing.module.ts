import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'',redirectTo:'/home',pathMatch:'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./client/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./client/register/register.module').then((m) => m.RegisterModule),
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./client/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
