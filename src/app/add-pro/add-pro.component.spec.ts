import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProComponent } from './add-pro.component';

describe('AddProComponent', () => {
  let component: AddProComponent;
  let fixture: ComponentFixture<AddProComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProComponent]
    });
    fixture = TestBed.createComponent(AddProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
