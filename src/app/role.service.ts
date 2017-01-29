import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Role } from './role';

@Injectable()
export class RoleService {

  rolesUrl = "/api/role";

  constructor(private http: Http) { }

  getRoles(id?: number[]): Promise<Role[]> {
    var role_id: number[] = [];
    if (id)
      role_id = id;

    let params = new URLSearchParams();
    for (var i=0; i < role_id.length; i++)
      params.append('id', String(role_id[i]));

    return this.http.get(this.rolesUrl, { search: params })
      .toPromise()
      .then(response => response.json() as Role[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for testing purposes only
    return Promise.reject(error.message || error);
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  getRole(id: number): Promise<Role> {
    const url = `${this.rolesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Role)
      .catch(this.handleError);
  }

  create(name: string): Promise<Role> {
    var role: Role = {
      id: 0, extid: 1, name: name,
      charid: name.toLowerCase().replace(" ", "_").substring(0, 10)
    };
    return this.http
      .post(this.rolesUrl, JSON.stringify(role), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Role)
      .catch(this.handleError);
  }

  update(role: Role): Promise<Role> {
    const url = `${this.rolesUrl}/${role.id}`;
    return this.http
      .put(url, JSON.stringify(role), { headers: this.headers })
      .toPromise()
      .then(() => role)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.rolesUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
