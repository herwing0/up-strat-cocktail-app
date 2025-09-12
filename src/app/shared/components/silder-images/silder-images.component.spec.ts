/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SilderImagesComponent } from './silder-images.component';

describe('SilderImagesComponent', () => {
  let component: SilderImagesComponent;
  let fixture: ComponentFixture<SilderImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilderImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilderImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
