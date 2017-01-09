import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Role } from './role';

@Injectable()
export class RoleService {

  rolesUrl = "/api/role";

  constructor(private http: Http) { }

  getRoles(): Promise<Role[]> {
    return this.http.get(this.rolesUrl)
      .toPromise()
      .then(response => response.json() as Role[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for testing purposes only
    return Promise.reject(error.message || error);
  }


}
