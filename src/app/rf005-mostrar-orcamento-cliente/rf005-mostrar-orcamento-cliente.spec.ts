
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rf005MostrarOrcamentoCliente } from './rf005-mostrar-orcamento-cliente';


describe('Rf005MostrarOrcamentoCliente', () => {
  let component: Rf005MostrarOrcamentoCliente;
  let fixture: ComponentFixture<Rf005MostrarOrcamentoCliente>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [Rf005MostrarOrcamentoCliente] 
    })
    .compileComponents(); 

    
    fixture = TestBed.createComponent(Rf005MostrarOrcamentoCliente);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  
  it('should create', () => {
   
    expect(component).toBeTruthy();
  });
});