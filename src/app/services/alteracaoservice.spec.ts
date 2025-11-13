import { TestBed } from '@angular/core/testing';

import { Alteracaoservice } from './alteracaoservice';

describe('Alteracaoservice', () => {
  let service: Alteracaoservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Alteracaoservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
