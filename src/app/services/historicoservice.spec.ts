import { TestBed } from '@angular/core/testing';

import { HistoricoService } from './historicoservice'; 

describe('HistoricoService', () => { 
  let service: HistoricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
