import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFormViewComponent } from './service-form-view.component';

describe('ServiceFormViewComponent', () => {
  let component: ServiceFormViewComponent;
  let fixture: ComponentFixture<ServiceFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceFormViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
