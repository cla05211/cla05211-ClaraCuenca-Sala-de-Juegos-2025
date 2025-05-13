import { TestBed } from '@angular/core/testing';

import { SonidoService } from './sonido.service';

describe('SonidoService', () => {
  let service: SonidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SonidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
