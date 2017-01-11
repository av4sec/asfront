import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';

import { Role }           from './role';

@Injectable()
export class RoleSearchService {
  constructor(private http: Http) { }
  search(term: string): Observable<Role[]> {
    return this.http
      .get(`api/role/search?q=${term}`)
      .map((r: Response) => r.json() as Role[]);
  }
}
