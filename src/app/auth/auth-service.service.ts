import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from './auth-data.interface';
import { tap, catchError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {

    jwtHelper = new JwtHelperService();
    baseUrl = environment.baseUrl;
    private authSubject = new BehaviorSubject<null | AuthData>(null);
    utente!: AuthData | any;

    user$ = this.authSubject.asObservable();
    timeOutToken: any;


    constructor(private http: HttpClient, private router: Router) { }


    //metodo di login quindi POST dell'interfaccia dell'utente durante il login


    login(data: { email: string, password: string }) {
        return this.http.post<AuthData>(`${this.baseUrl}auth/login`, data).pipe(
            tap(data => {
                console.log(data);
                this.authSubject.next(data);
                this.utente = data;
                console.log(this.utente);
                localStorage.setItem('user', JSON.stringify(this.utente));
                this.autoLogout(data);
            }),
            catchError(this.errors)
            );
    }

    //function che controlla la validita del token, e solo se non è scaduto l'applicazione riavviata non richiede il nuovo accesso, viceversa fa rieffettuare il login

    rimanda(){
        const user = localStorage.getItem('user');
        if(!user){
            return;
        }
        const utenteData: AuthData = JSON.parse(user);
        if(this.jwtHelper.isTokenExpired(utenteData.accessToken)){
            return;
        }
        this.authSubject.next(utenteData);
        this.autoLogout(utenteData);
    }

signup(data: {
    nome: string;
    cognome: string;
    username: string;
    email: string;
    password: string;
}){
    return this.http.post(`${this.baseUrl}auth/register`, data);
}


//metodo di logout manuale, collegato a quello automatico in caso di scadenza del token (durata del token definito nel cors filter del back end)

logout(){
    this.authSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    if(this.timeOutToken){
        clearTimeout(this.timeOutToken);
    }
}


//function che esegue il logout in maniera automatica dopo aver verificato la scadenza del token

autoLogout(data: AuthData){
    const tokenExpired = this.jwtHelper.getTokenExpirationDate(
        data.accessToken
    ) as Date;
    const expireMilliseconds = tokenExpired.getTime() - new Date().getTime();
    this.timeOutToken = setTimeout(() =>{
        this.logout();
    },expireMilliseconds );

}

//controllo con switch case verificare gli errore ( controllare e coadiuvare i metodi del backEnd )

    private errors(err: any) {
        switch (err.error) {
            case 'Email already exists':
                return throwError('Utente già presente');
                break;

            case 'Email format is invalid':
                return throwError('Formato mail non valido');
                break;

            default:
                return throwError('Errore nella chiamata');
                break;
        }
    }
}

