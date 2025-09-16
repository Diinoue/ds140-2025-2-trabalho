import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RF018CRUDFuncionarios } from './rf018-crud-funcionarios';

describe('RF018CRUDFuncionarios', () => {
  let component: RF018CRUDFuncionarios;
  let fixture: ComponentFixture<RF018CRUDFuncionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RF018CRUDFuncionarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RF018CRUDFuncionarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
