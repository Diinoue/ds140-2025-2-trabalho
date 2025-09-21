import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarFuncionario } from './visualizar-funcionario';

describe('VisualizarFuncionario', () => {
  let component: VisualizarFuncionario;
  let fixture: ComponentFixture<VisualizarFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
