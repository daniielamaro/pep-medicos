import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAtendimentoComponent } from './historico-atendimento.component';

describe('HistoricoAtendimentoComponent', () => {
  let component: HistoricoAtendimentoComponent;
  let fixture: ComponentFixture<HistoricoAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoAtendimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
