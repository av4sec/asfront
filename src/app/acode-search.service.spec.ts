/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AcodeSearchService } from './acode-search.service';

describe('AcodeSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcodeSearchService]
    });
  });

  it('should ...', inject([AcodeSearchService], (service: AcodeSearchService) => {
    expect(service).toBeTruthy();
  }));
});
