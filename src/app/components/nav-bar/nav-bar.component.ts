import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    user!: AuthData | null;

    constructor(private authService: AuthServiceService) { }

    ngOnInit(): void {

        this.authService.user$.subscribe((_user) => {
            this.user = _user;
        });
    }


    logout() {
        this.authService.logout();
    }
}
