import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrochureRequestSentComponent } from './brochure-request-sent.component';

describe('BrochureRequestSentComponent', () => {
  let component: BrochureRequestSentComponent;
  let fixture: ComponentFixture<BrochureRequestSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrochureRequestSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrochureRequestSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
