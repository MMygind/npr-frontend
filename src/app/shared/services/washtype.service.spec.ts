import { TestBed } from '@angular/core/testing';

import { WashTypeService } from './washtype.service';

describe('WashtypeService', () => {
  let service: WashTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WashTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
