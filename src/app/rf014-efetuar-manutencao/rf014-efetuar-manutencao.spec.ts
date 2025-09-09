import { TestBed } from '@angular/core/testing';
import { Rf014EfetuarManutencao } from './rf014-efetuar-manutencao';

describe('Rf014EfetuarManutencao', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rf014EfetuarManutencao],
    }).compileComponents();
  });

  it('criar componente:', () => {
    const fixture = TestBed.createComponent(Rf014EfetuarManutencao);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});