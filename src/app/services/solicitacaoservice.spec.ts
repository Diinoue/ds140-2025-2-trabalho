import { TestBed } from '@angular/core/testing';

import { Solicitacaoservice } from './solicitacaoservice';

describe('Solicitacaoservice', () => {
  let service: Solicitacaoservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Solicitacaoservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
