import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    isLoading = false;


  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {}

  accedi(form: NgForm) {
    this.isLoading = true;
    console.log("Login effettuato con successo");
    try {
        this.authService.login(form.value).subscribe();
        this.isLoading = false;
        alert('Login effettuato!');
        this.router.navigate(['/home']);
    } catch (error) {
        this.isLoading = false;
        alert('Login sbagliato!');
        console.error(error);
    }
}

}
