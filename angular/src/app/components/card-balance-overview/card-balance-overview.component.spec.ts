import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardBalanceOverviewComponent } from "./card-balance-overview.component";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("CardBalanceOverviewComponent", () => {
  let component: CardBalanceOverviewComponent;
  let fixture: ComponentFixture<CardBalanceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBalanceOverviewComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardBalanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
