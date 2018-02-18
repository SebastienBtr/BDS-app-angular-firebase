import { Component, OnInit } from '@angular/core';

import {AllosService} from "../../services/allos.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-allos',
  templateUrl: './allos.component.html',
  styleUrls: ['./allos.component.css']
})
export class AllosComponent implements OnInit {

  allos: Observable<any[]>;

  constructor(private allosService: AllosService) { }

  ngOnInit() {

    this.refreshData();
  }

  private refreshData(): void {

    this.allos = this.allosService.getAllAllos();
  }

  updateAllo(id, state) {
    state = !state;
    this.allosService.postUpdateAllo(id,state)
  }

}
