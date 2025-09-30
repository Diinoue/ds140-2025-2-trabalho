import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rf019Relatorio } from './rf019-relatorio';

describe('Rf019Relatorio', () => {
  let component: Rf019Relatorio;
  let fixture: ComponentFixture<Rf019Relatorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rf019Relatorio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rf019Relatorio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
