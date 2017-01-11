import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import './rxjs-extensions';

import { AppComponent } from './app.component';

// import { RoleSearchComponent }  from './role-search.component';
import { RoleService }          from './role.service';
import { RoleSearchService }    from './role-search.service';
import { RolesComponent }       from './roles/roles.component';
import { RoleDetailComponent }  from './role-detail/role-detail.component';
import { RoleSearchComponent }  from './role-search/role-search.component';

@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    RoleDetailComponent,
    RoleSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [RoleService, RoleSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
