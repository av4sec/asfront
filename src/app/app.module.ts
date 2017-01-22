import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '@angular/material';

import './rxjs-extensions';

import { AppComponent } from './app.component';

import { RoleAcodeService }     from './role-acode.service';
import { AcodeService }         from './acode.service';
import { RoleService }          from './role.service';
import { RoleSearchService }    from './role-search.service';
import { RolesComponent }       from './roles/roles.component';
import { RoleDetailComponent }  from './role-detail/role-detail.component';
import { RoleSearchComponent }  from './role-search/role-search.component';
import { AcodesComponent }      from './acodes/acodes.component';
import { RoleAcodeComponent }   from './role-acode/role-acode.component';
import { RoleAcodeCtrlComponent } from './role-acode-ctrl/role-acode-ctrl.component';
import { RoleAcodeCellComponent } from './role-acode-cell/role-acode-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    RoleDetailComponent,
    RoleSearchComponent,
    AcodesComponent,
    RoleAcodeComponent,
    RoleAcodeCtrlComponent,
    RoleAcodeCellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [RoleService, RoleSearchService, AcodeService, RoleAcodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
