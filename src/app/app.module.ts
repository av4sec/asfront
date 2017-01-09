import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//import { AppRoutingModule }     from './app-routing.module';

import './rxjs-extensions';

import { AppComponent } from './app.component';

// import { RoleDetailComponent }  from './role-detail.component';
// import { RoleSearchComponent }  from './role-search.component';
import { RoleService }    from './role.service';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  declarations: [
    AppComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
