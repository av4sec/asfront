import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AcodeSearchService } from '../acode-search.service';
import { Acode } from '../acode';

@Component({
  selector: 'app-acode-search',
  templateUrl: './acode-search.component.html',
  styleUrls: ['./acode-search.component.css']
})

export class AcodeSearchComponent implements OnInit {

  acodes: Observable<Acode[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private acodeSearchService: AcodeSearchService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.acodes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.acodeSearchService.search(term)
        : Observable.of<Acode[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of(<Acode[]>([]));
      })
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  gotoDetail(acode: Acode): void {
    let link = ['/acode', acode.id];
    this.router.navigate(link);
  }

}
