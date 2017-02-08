import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs';

import { Acode } from './acode';

@Injectable()
export class AcodeSearchService {

  acodeSearchUrl = "/api/acode/search";

  constructor(private http: Http) { }

  search(term: string): Observable<Acode[]> {
    var searchParams = new URLSearchParams();
    searchParams.append('q', encodeURI(term));
    return this.http
      .get(this.acodeSearchUrl, {search: searchParams})
      .map((r: Response) => r.json() as Acode[]);
  }

}
