import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoleAcode } from '../role-acode';
import { RoleAcodeService } from '../role-acode.service';

import { Role } from '../role';
import { RoleService } from '../role.service';

import { Acode } from '../acode';
import { AcodeService } from '../acode.service';

import { Cell, TextCell, RoleCell, AcodeCell, RoleAcodeCell } from '../role-acode-cell';
import { RoleAcodeCellComponent } from '../role-acode-cell/role-acode-cell.component';

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

  cells: Cell[][] = [];

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
    this.cells[0] = [];
    this.cells[0][0] = new TextCell("");
    for (var c = 1; c < this.numberOfCols; c++) {
      this.cells[0][c] = new RoleCell(this.roles[c-1]);
    }
    for (var r = 1; r < this.numberOfRows; r++) {
      this.cells[r] = [];
      this.cells[r][0] = new AcodeCell(this.acodes[r-1]);
      for (var c = 1; c < this.numberOfCols; c++) {
        var role_id: number = this.roles[c-1].id;
        var acode_id: number = this.acodes[r-1].id;
        var role_acode_exists: boolean = this.roleAcodeExists(role_id, acode_id);
        this.cells[r][c] = new RoleAcodeCell(role_id, acode_id, role_acode_exists);
      }
    }
  }

  roleAcodeExists(role_id: number, acode_id: number): boolean {
    for (let ra of this.role_acode) {
      if (ra.role_id == role_id && ra.acode_id == acode_id) {
        return true;
      }
    }
    return false;
  }

  getRoleAcode(): void {
    this.roleAcodeService.getRoleAcode().then(
      role_acode => {
        this.role_acode = role_acode;
        this.initCells();
      });
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

  save(): void {
    for (var r = 1; r < this.numberOfRows; r++) {
      for (var c = 1; c < this.numberOfCols; c++) {
        var cell = <RoleAcodeCell>this.cells[r][c];
        var role_id: number = cell.getRoleId();
        var acode_id: number = cell.getAcodeId();
        var checked: boolean = cell.getChecked();
        var role_acode_exists: boolean = this.roleAcodeExists(role_id, acode_id);
        if (checked != role_acode_exists) {
          console.log(role_id+", "+acode_id+" : "+checked+" ["+role_acode_exists+"]");
          if (checked) {
            // add role-acode relation
            this.add(role_id, acode_id);
          }
          if (role_acode_exists) {
            // remove role-acode relation
            this.delete(role_id, acode_id);
          }
        }
      }
    }
  }

  add(role_id: number, acode_id: number): void {
    this.roleAcodeService.create(role_id, acode_id)
      .then(roleAcode => {
        // breakpoint (?)
        // console.log(roleAcode);
      });
  }

  delete(role_id: number, acode_id: number): void {
    this.roleAcodeService.delete(role_id, acode_id)
    .then(roleAcode => {
      // breakpoint (?)
      // console.log(roleAcode);
    });
  }
}
