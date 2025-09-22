import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEquipamentos } from './cadastro-equipamentos';

describe('CadastroEquipamentos', () => {
  let component: CadastroEquipamentos;
  let fixture: ComponentFixture<CadastroEquipamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEquipamentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEquipamentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
