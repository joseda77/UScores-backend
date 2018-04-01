import { TestBed, inject } from '@angular/core/testing';

import { ParticipantesService } from './participantes.service';

describe('ParticipantesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipantesService]
    });
  });

  it('should be created', inject([ParticipantesService], (service: ParticipantesService) => {
    expect(service).toBeTruthy();
  }));
});
