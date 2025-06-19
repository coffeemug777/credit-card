import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardActiveComponent } from "./card-active.component";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("CardActiveComponent", () => {
  let component: CardActiveComponent;
  let fixture: ComponentFixture<CardActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardActiveComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
