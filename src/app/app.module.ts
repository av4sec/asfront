import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import './rxjs-extensions';

import { AppComponent } from './app.component';

import { AcodeService }         from './acode.service';
import { RoleService }          from './role.service';
import { RoleSearchService }    from './role-search.service';
import { RolesComponent }       from './roles/roles.component';
import { RoleDetailComponent }  from './role-detail/role-detail.component';
import { RoleSearchComponent }  from './role-search/role-search.component';
import { AcodesComponent }      from './acodes/acodes.component';

@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    RoleDetailComponent,
    RoleSearchComponent,
    AcodesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [RoleService, RoleSearchService, AcodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
