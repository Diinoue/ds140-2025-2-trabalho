import { TestBed } from '@angular/core/testing';
import { Rf004SolicitacaoComponent } from './rf004-solicitacao';

describe('Rf004SolicitacaoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rf004SolicitacaoComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Rf004SolicitacaoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
