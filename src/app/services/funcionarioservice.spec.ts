import { TestBed } from '@angular/core/testing';

import { Funcionarioservice } from './funcionarioservice';

describe('Funcionarioservice', () => {
  let service: Funcionarioservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Funcionarioservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
