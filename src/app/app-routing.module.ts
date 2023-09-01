import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { GuardGuard } from './auth/guard.guard';
import { RegistrazioneComponent } from './auth/register/registrazione/registrazione.component';
const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
         path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegistrazioneComponent
   },
    {
        path: 'home', component: HomePageComponent,
        //canActivate: [GuardGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
