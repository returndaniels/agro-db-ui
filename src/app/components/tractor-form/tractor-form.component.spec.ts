import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TractorFormComponent } from './tractor-form.component';

describe('TractorFormComponent', () => {
  let component: TractorFormComponent;
  let fixture: ComponentFixture<TractorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TractorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TractorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
