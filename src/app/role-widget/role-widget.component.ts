import { Component, Input, OnInit } from '@angular/core';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { Role } from '../role';
import { RoleService } from '../role.service';
import { RoleSearchService } from '../role-search.service';

@Component({
  selector: 'role-widget',
  templateUrl: './role-widget.component.html',
  styleUrls: ['./role-widget.component.css']
})
export class RoleWidgetComponent implements OnInit {

  @Input() role: Role;
  @Input() allowAdd: boolean = false;
  @Input() allowEdit: boolean = false;
  @Input() allowDelete: boolean = false;
  @Input() allowSelect: boolean = false;

  roleNameOrSearchTerm: string;
  showSearchButton: boolean;
  showAddButton: boolean;
  showUpdateButton: boolean;
  showDeleteButton: boolean;

  fieldText: string = "";
  fieldPlaceholder: string;
  prototype: Role;

  private searchTerms = new Subject<string>();
  searching: boolean = false;
  matchingRoles: Observable<Role[]>;

  editing: boolean = false;

  constructor(
    private roleService: RoleService,
    private roleSearchService: RoleSearchService,
  ) {
  }

  updateUIState() {
    this.showUpdateButton = false;
    this.showDeleteButton = false;
    this.showSearchButton = false;
    this.showAddButton = false;
    if (this.role) {
    }
    else {
      if (this.allowSelect) {
        this.showSearchButton = true;
        this.showAddButton = this.allowAdd && this.searching;
      }
    }
  }

  ngOnInit() {

    if (this.allowSelect) {
      // Connect matchingRoles to the automatic search term lookup
      this.matchingRoles = this.searchTerms
        .debounceTime(300)        // wait for 300ms pause in events
        .distinctUntilChanged()   // ignore if next search term is same as previous
        .switchMap(term => term   // switch to new observable each time
          // return the http search observable
          ? this.roleSearchService.search(term)
          // or the observable of empty roles if no search term
          : Observable.of<Role[]>([]))
        .catch(error => {
          // TODO: real error handling
          console.log(error);
          return Observable.of<Role[]>([]);
        }
        );
    }
    this.updateUIState()
  }

  search(): void {
    let term = this.fieldText;
    console.log("Searching " + term);
    //this.searchTerms.next(term);
    this.matchingRoles = this.roleSearchService.search(term);
    this.searching = true;
    this.prototype = new Role();
    this.prototype.name = term;
    this.updateUIState();
  }

  selectMatchingRole(role: Role): void {
    this.role = role;
    this.searching = false;
    this.updateUIState();
  }

  update(): void {
    console.log("Updating " + this.role);
    this.roleService.update(this.role)
      .then(role => { });
  }

  create(): void {
    let name = this.fieldText;
    console.log("Creating " + name);
    name = name.trim();
    if (name) {
      this.roleService.create(name)
        .then(role => {
          this.fieldText = "";
          this.role = role;
          this.updateUIState()
        });
    }
    this.updateUIState();
  }
}
