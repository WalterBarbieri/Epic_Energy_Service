import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CRUDService {

    baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

    getClienti(){
        return this.http.get(`${this.baseUrl}utenti/cliente`)
    }






}
