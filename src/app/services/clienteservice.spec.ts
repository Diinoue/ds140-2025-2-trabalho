import { TestBed } from '@angular/core/testing';

import { Clienteservice } from './clienteservice';

describe('Clienteservice', () => {
  let service: Clienteservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clienteservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
