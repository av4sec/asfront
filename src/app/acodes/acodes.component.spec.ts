/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AcodesComponent } from './acodes.component';

describe('AcodesComponent', () => {
  let component: AcodesComponent;
  let fixture: ComponentFixture<AcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
