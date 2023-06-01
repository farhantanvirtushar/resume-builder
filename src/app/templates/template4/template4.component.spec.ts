import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template4Component } from './template4.component';

describe('Template4Component', () => {
  let component: Template4Component;
  let fixture: ComponentFixture<Template4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Template4Component]
    });
    fixture = TestBed.createComponent(Template4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
