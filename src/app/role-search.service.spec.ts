/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleSearchService } from './role-search.service';

describe('RoleSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleSearchService]
    });
  });

  it('should ...', inject([RoleSearchService], (service: RoleSearchService) => {
    expect(service).toBeTruthy();
  }));
});
