import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rf003Pagcliente } from './rf003-pagcliente';

describe('Rf003Pagcliente', () => {
  let component: Rf003Pagcliente;
  let fixture: ComponentFixture<Rf003Pagcliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rf003Pagcliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rf003Pagcliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
