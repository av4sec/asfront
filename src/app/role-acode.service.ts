import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

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

  private headers = new Headers({ 'Content-Type': 'application/json' });

  create(role_id: number, acode_id: number): Promise<RoleAcode> {
    var role_acode: RoleAcode = {
      role_id: role_id, acode_id: acode_id
    };
    return this.http
      .post(this.roleAcodeUrl, JSON.stringify(role_acode), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as RoleAcode)
      .catch(this.handleError);
  }

  delete(role_id: number, acode_id: number): Promise<void> {
    var role_acode: RoleAcode = {
      role_id: role_id, acode_id: acode_id
    };

    return this.http.delete(this.roleAcodeUrl, new RequestOptions({
      headers: this.headers,
      body: JSON.stringify(role_acode)}))
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
