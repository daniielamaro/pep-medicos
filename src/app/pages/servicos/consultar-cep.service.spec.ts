import { TestBed } from '@angular/core/testing';

import { ConsultarCepService } from './consultar-cep.service';

describe('ConsultarCepService', () => {
  let service: ConsultarCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarCepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
