import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardRecentActivitiesComponent } from "./card-recent-activities.component";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("CardRecentActivitiesComponent", () => {
  let component: CardRecentActivitiesComponent;
  let fixture: ComponentFixture<CardRecentActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRecentActivitiesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardRecentActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
