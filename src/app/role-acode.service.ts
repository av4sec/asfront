import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { RoleAcode } from './role-acode';

@Injectable()
export class RoleAcodeService {

  roleAcodeUrl = "/api/role-acode"

  constructor(private http: Http) { }

  getRoleAcode(): Promise<RoleAcode[]> {
    return this.http.get(this.roleAcodeUrl)
      .toPromise()
      .then(response => response.json() as RoleAcode[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for testing purposes only
    return Promise.reject(error.message || error);
  }
}
