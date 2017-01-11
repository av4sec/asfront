import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';

import { RoleSearchService } from '../role-search.service';

import { Role }              from '../role';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.css']
})

export class RoleSearchComponent implements OnInit {
  roles: Observable<Role[]>;
  initialTerm: string = "12";
  private searchTerms = new Subject<string>();

  constructor(
    private roleSearchService: RoleSearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.roles = this.searchTerms
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

    // Get initial query paramater
    this.initialTerm = this.route.snapshot.queryParams['q'];

    // TODO we should somehow trigger the search with this query parameter
    // adding it to searchTerms does not work here.
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  gotoDetail(role: Role): void {
    let link = ['/detail', role.id];
    this.router.navigate(link);
  }
}
