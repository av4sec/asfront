import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'asfront';
  links = [
    { route: "/main", name: "Role-Acode-Ctrl" },
    { route: "/role", name: "Roles" },
    { route: "/role/search", name: "Role Search" },
    { route: "/acode", name: "Acodes" },
    { route: "/role-acode", name: "Role-Acode" },
  ]

  constructor(
    private router: Router
  ) { }

  onClick(route: string): void {
    this.router.navigate([route]);
  }
}
