import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEquipamentos } from './crud-equipamentos';

describe('CrudEquipamentos', () => {
  let component: CrudEquipamentos;
  let fixture: ComponentFixture<CrudEquipamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudEquipamentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudEquipamentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
