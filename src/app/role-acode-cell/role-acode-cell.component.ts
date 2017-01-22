import { Component, OnInit, Input } from '@angular/core';

import { RoleAcodeCell } from '../role-acode-cell';

@Component({
  selector: 'app-role-acode-cell',
  templateUrl: './role-acode-cell.component.html',
  styleUrls: ['./role-acode-cell.component.css']
})
export class RoleAcodeCellComponent implements OnInit {

  @Input() cell: RoleAcodeCell;

  constructor() { }

  ngOnInit() {
  }

}
