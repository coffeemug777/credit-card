import { TestBed } from "@angular/core/testing";

import { CcService } from "./cc.service";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe("CcService", () => {
  let service: CcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CcService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
