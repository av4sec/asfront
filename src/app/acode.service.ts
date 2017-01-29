import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Acode } from './acode';

@Injectable()
export class AcodeService {

  acodesUrl = "/api/acode"

  constructor(private http: Http) { }

  getAcodes(id?: number[]): Promise<Acode[]> {
    var acode_id: number[] = [];
    if (id)
      acode_id = id;

    let params = new URLSearchParams();
    for (var i=0; i < acode_id.length; i++)
      params.append('id', String(acode_id[i]));

    return this.http.get(this.acodesUrl, { search: params })
      .toPromise()
      .then(response => response.json() as Acode[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for testing purposes only
    return Promise.reject(error.message || error);
  }

}
