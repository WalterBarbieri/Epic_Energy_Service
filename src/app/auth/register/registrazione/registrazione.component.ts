import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
    selector: 'app-registrazione',
    templateUrl: './registrazione.component.html',
    styleUrls: ['./registrazione.component.scss']
})
export class RegistrazioneComponent implements OnInit {
    isLoading = false;

    constructor(private authService: AuthServiceService, private router: Router) { }

    ngOnInit(): void { }

    registra(form: NgForm) {
        this.isLoading = true;
        console.log(form.value);
        try {
            this.authService.signup(form.value).subscribe();
            this.router.navigate(['/login']);
            this.isLoading = false
        } catch (error: any) { // Cast error to any type
            console.error(error);
            if (error.status == 400) {
                alert('Email già registrata!');
                this.router.navigate(['/register']);
            }
            this.isLoading = false
        }
    }

}
