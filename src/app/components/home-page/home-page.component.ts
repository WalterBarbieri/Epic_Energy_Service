import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CRUDService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    sub!: Subscription;
    clienti: any;
  constructor(private http: CRUDService) { }

  ngOnInit(): void {
    this.sub! = this.http.getClienti().subscribe((trend: any) => {
        this.clienti = trend.results
        console.log(this.clienti);
      });
  }

}
