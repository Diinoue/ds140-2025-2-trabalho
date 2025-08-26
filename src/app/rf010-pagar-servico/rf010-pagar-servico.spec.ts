import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rf010PagarServico } from './rf010-pagar-servico';

describe('Rf010PagarServico', () => {
  let component: Rf010PagarServico;
  let fixture: ComponentFixture<Rf010PagarServico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rf010PagarServico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rf010PagarServico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
