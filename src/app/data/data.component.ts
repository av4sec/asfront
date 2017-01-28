import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  text = "";

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {

  }

  get(): void {
    this.dataService.getData().then(text => this.text = text);
  }

  put(): void {
    this.dataService.putData(this.text)
      .then(data => {
        console.log(data);
      })
  }
}
