import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEquipamento } from './editar-equipamento';

describe('EditarEquipamento', () => {
  let component: EditarEquipamento;
  let fixture: ComponentFixture<EditarEquipamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEquipamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEquipamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
