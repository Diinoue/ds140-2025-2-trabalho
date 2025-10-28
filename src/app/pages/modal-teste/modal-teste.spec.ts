import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTeste } from './modal-teste';

describe('ModalTeste', () => {
  let component: ModalTeste;
  let fixture: ComponentFixture<ModalTeste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTeste]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTeste);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
