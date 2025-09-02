import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rf011PaginaInicialFuncionario } from './rf011-pagina-inicial-funcionario';

describe('Rf011PaginaInicialFuncionario', () => {
  let component: Rf011PaginaInicialFuncionario;
  let fixture: ComponentFixture<Rf011PaginaInicialFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rf011PaginaInicialFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rf011PaginaInicialFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
