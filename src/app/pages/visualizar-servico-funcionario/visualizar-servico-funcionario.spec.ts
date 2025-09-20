import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarServicoFuncionario } from './visualizar-servico-funcionario';

describe('VisualizarServicoFuncionario', () => {
  let component: VisualizarServicoFuncionario;
  let fixture: ComponentFixture<VisualizarServicoFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarServicoFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarServicoFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
