import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcodesComponent }      from './acodes/acodes.component';
import { RolesComponent }      from './roles/roles.component';
import { RoleDetailComponent }  from './role-detail/role-detail.component';
import { RoleSearchComponent }  from './role-search/role-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/role', pathMatch: 'full' },
  { path: 'acode', component: AcodesComponent },
  { path: 'role', component: RolesComponent },
  { path: 'role/:id', component: RoleDetailComponent },
  { path: 'role/search', component: RoleSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
