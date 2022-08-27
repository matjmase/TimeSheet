import { TestBed } from '@angular/core/testing';

import { CurrentSheetService } from './current-sheet.service';

describe('CurrentSheetService', () => {
  let service: CurrentSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
