import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAcodeCtrlComponent }      from './role-acode-ctrl/role-acode-ctrl.component';
import { AcodesComponent }      from './acodes/acodes.component';
import { AcodeSearchComponent } from './acode-search/acode-search.component';
import { RolesComponent }      from './roles/roles.component';
import { RoleDetailComponent }  from './role-detail/role-detail.component';
import { RoleSearchComponent }  from './role-search/role-search.component';
import { RoleAcodeComponent }  from './role-acode/role-acode.component';
import { DataComponent } from './data/data.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: RoleAcodeCtrlComponent },
  { path: 'acode', component: AcodesComponent },
  { path: 'acode/search', component: AcodeSearchComponent },
  { path: 'role', component: RolesComponent },
  { path: 'role/search', component: RoleSearchComponent },
  { path: 'role/:id', component: RoleDetailComponent },
  { path: 'role-acode', component: RoleAcodeComponent },
  { path: 'data', component: DataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
