import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrochurePdfComponent } from './brochure-pdf.component';

describe('BrochurePdfComponent', () => {
    let component: BrochurePdfComponent;
    let fixture: ComponentFixture<BrochurePdfComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BrochurePdfComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BrochurePdfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
