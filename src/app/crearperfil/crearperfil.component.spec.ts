import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearperfilComponent } from './crearperfil.component';

describe('CrearperfilComponent', () => {
  let component: CrearperfilComponent;
  let fixture: ComponentFixture<CrearperfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearperfilComponent]
    });
    fixture = TestBed.createComponent(CrearperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
