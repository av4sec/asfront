import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Acode } from './acode';

@Injectable()
export class AcodeService {

  acodesUrl = "/api/acode"

  constructor(private http: Http) { }

  getAcodes(): Promise<Acode[]> {
    return this.http.get(this.acodesUrl)
      .toPromise()
      .then(response => response.json() as Acode[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for testing purposes only
    return Promise.reject(error.message || error);
  }

}
