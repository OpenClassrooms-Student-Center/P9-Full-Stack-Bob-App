import { TestBed } from '@angular/core/testing';

import { JokesService } from './jokes.service';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('JokesService', () => {
  let service: JokesService;

  beforeEach(() => {
      TestBed.configureTestingModule({
    imports: [],
    providers: [JokesService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
      service = TestBed.get(JokesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
