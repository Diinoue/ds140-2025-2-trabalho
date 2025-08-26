import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RF008VisualizarServico } from './rf008-visualizar-servico';

describe('RF008VisualizarServico', () => {
  let component: RF008VisualizarServico;
  let fixture: ComponentFixture<RF008VisualizarServico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RF008VisualizarServico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RF008VisualizarServico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
