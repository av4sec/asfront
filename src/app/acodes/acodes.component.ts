import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Acode } from '../acode';
import { AcodeService } from '../acode.service';

@Component({
  selector: 'app-acodes',
  templateUrl: './acodes.component.html',
  styleUrls: ['./acodes.component.css']
})

export class AcodesComponent implements OnInit {

  acodes: Acode[];

  constructor(
    private router: Router,
    private acodeService: AcodeService
  ) { }

  ngOnInit(): void {
    this.getAcodes();
  }

  getAcodes(): void {
    this.acodeService.getAcodes().then(acodes => this.acodes = acodes);
  }

  gotoDetail(id: number): void {
    this.router.navigate(['/acode', id]);
  }

}
