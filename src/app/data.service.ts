import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  dataUrl = "/api/data";

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for testing purposes only
    return Promise.reject(error.message || error);
  }

  getData(): Promise<string> {
    return this.http.get(this.dataUrl)
      .toPromise()
      .then(response => response.text() as string)
      .catch(this.handleError);
  }

  putData(data: string): Promise<string> {
    return this.http
      .put(this.dataUrl, data, { headers: this.headers })
      .toPromise()
      .then(() => data)
      .catch(this.handleError);
  }
}
