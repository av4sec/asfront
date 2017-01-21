import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoleAcode } from '../role-acode';
import { RoleAcodeService } from '../role-acode.service';

import { Role } from '../role';
import { RoleService } from '../role.service';

import { Acode } from '../acode';
import { AcodeService } from '../acode.service';

@Component({
  selector: 'app-role-acode',
  templateUrl: './role-acode.component.html',
  styleUrls: ['./role-acode.component.css']
})

export class RoleAcodeComponent implements OnInit {

  role_acode: RoleAcode[];
  roles: Role[];
  acodes: Acode[];

  numberOfCols: number = 1;
  numberOfRows: number = 1;

  cells: string[][] = [];

  constructor(
    private router: Router,
    private roleAcodeService: RoleAcodeService,
    private roleService: RoleService,
    private acodeService: AcodeService
  ) {  }

  ngOnInit(): void {
    this.getRoleAcode();
    this.getRoles();
    this.getAcodes();
  }

  initCells(): void {
    for (var r = 0; r < this.numberOfRows - 1; r++) {
      this.cells[r] = [];
      this.cells[r][0] = this.acodes[r].name + " [" + this.acodes[r].id + "]";
      for (var c = 1; c < this.numberOfCols; c++) {
        var ra: string = "";
        ra = this.roleAcodeExists(this.roles[c-1].id, this.acodes[r].id,);
        this.cells[r][c] = ra;
      }
    }
  }

  roleAcodeExists(role_id: number, acode_id: number): string {
    for (let ra of this.role_acode) {
      if (ra.role_id == role_id && ra.acode_id == acode_id) {
        return "+";
      }
    }
    return "";
  }

  getRoleAcode(): void {
    this.roleAcodeService.getRoleAcode().then(role_acode => this.role_acode = role_acode);
  }

  getRoles(): void {
    this.roleService.getRoles().then(
      roles => {
        this.roles = roles;
        this.numberOfCols = roles.length + 1;
        this.initCells();
    });
  }

  getAcodes(): void {
    this.acodeService.getAcodes().then(
      acodes => {
        this.acodes = acodes;
        this.numberOfRows = acodes.length + 1;
        this.initCells();
      });
  }
}
