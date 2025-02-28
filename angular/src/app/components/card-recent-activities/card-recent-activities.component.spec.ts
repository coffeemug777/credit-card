import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecentActivitiesComponent } from './card-recent-activities.component';

describe('CardRecentActivitiesComponent', () => {
  let component: CardRecentActivitiesComponent;
  let fixture: ComponentFixture<CardRecentActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRecentActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRecentActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
