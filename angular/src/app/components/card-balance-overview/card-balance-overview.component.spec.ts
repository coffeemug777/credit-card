import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBalanceOverviewComponent } from './card-balance-overview.component';

describe('CardBalanceOverviewComponent', () => {
  let component: CardBalanceOverviewComponent;
  let fixture: ComponentFixture<CardBalanceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBalanceOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBalanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
