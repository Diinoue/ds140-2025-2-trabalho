import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rf005Mostrarorcamento } from './rf005-mostrarorcamento';

describe('Rf005Mostrarorcamento', () => {
  let component: Rf005Mostrarorcamento;
  let fixture: ComponentFixture<Rf005Mostrarorcamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rf005Mostrarorcamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rf005Mostrarorcamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
