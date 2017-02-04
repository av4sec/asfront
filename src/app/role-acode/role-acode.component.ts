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

import { MdDialog, MdDialogRef } from '@angular/material';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';

@Component({
  selector: 'app-role-acode',
  templateUrl: './role-acode.component.html',
  styleUrls: ['./role-acode.component.css']
})

export class RoleAcodeComponent implements OnInit {

  role_acode: RoleAcode[];
  roles: Role[];
  acodes: Acode[];

  role_id: number[] = [2, 3];
  acode_id: number[] = [3, 4, 5];

  numberOfCols: number = 1;
  numberOfRows: number = 1;

  cells: Cell[][] = [];

  dialogRef: MdDialogRef<SearchDialogComponent>;

  constructor(
    private router: Router,
    private roleAcodeService: RoleAcodeService,
    private roleService: RoleService,
    private acodeService: AcodeService,
    public dialog: MdDialog
  ) {  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.cells = [];
    this.numberOfCols = 1;
    this.numberOfRows = 1;
    this.role_acode = [];
    this.roles = [];
    this.acodes = [];

    this.getRoles(this.role_id);
    this.getAcodes(this.acode_id);
    this.getRoleAcode(this.role_id, this.acode_id);
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
    if (this.role_acode)
      for (let ra of this.role_acode)
        if (ra.role_id == role_id && ra.acode_id == acode_id)
          return true;
    return false;
  }

  getRoleAcode(role_id: number[], acode_id: number[]): void {
    this.roleAcodeService.getRoleAcode(role_id, acode_id).then(
      role_acode => {
        this.role_acode = role_acode;
        this.initCells();
      });
  }

  getRoles(id: number[]): void {
    this.roleService.getRoles(id).then(
      roles => {
        this.roles = roles;
        this.numberOfCols = roles.length + 1;
        this.initCells();
    });
  }

  getAcodes(id: number[]): void {
    this.acodeService.getAcodes(id).then(
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

  openDialog(): void {
    this.dialogRef = this.dialog.open(SearchDialogComponent);

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.role_id = result[0];
        this.acode_id = result[1];
        this.init();
      }
      this.dialogRef = null;
    });
  }
}
