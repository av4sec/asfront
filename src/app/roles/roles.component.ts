import { Component, OnInit } from '@angular/core';

import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: Role[];

  constructor(
    //private router: Router,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.roleService.getRoles().then(roles => this.roles = roles);
  }


  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
  //
  // gotoDetail(): void {
  //   this.router.navigate(['/detail', this.selectedHero.id]);
  // }
  //

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.roleService.create(name)
      .then(role => {
        this.roles.push(role);
      });
  }

  delete(role: Role): void {
    this.roleService
      .delete(role.id)
      .then(() => {
        this.roles = this.roles.filter(r => r !== role);
      });
  }
}
