import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { RoleAcode } from './role-acode';

@Injectable()
export class RoleAcodeService {

  roleAcodeUrl = "/api/role-acode"

  constructor(private http: Http) { }

  getRoleAcode(rid?: number[], aid?: number[]): Promise<RoleAcode[]> {
    var role_id: number[] = [];
    if (rid)
      role_id = rid;

    var acode_id: number[] = [];
    if (aid)
      acode_id = aid;

    let params = new URLSearchParams();

    for (var i=0; i < role_id.length; i++)
      params.append('role_id', String(role_id[i]));

    for (var i=0; i < acode_id.length; i++)
      params.append('acode_id', String(acode_id[i]));

    return this.http.get(this.roleAcodeUrl, { search: params })
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
