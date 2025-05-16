import { Component, inject, OnInit } from "@angular/core";
import { CcService } from "../../services/cc.service";
import { CurrencyPipe, NgIf } from "@angular/common";
import { Card } from "../../model/card";
import { isWithinInterval, startOfMonth, addDays } from "date-fns";

@Component({
  selector: "app-card-balance-overview",
  imports: [NgIf, CurrencyPipe],
  templateUrl: "./card-balance-overview.component.html",
  styleUrl: "./card-balance-overview.component.scss",
})
export class CardBalanceOverviewComponent implements OnInit {
  private ccService = inject(CcService);
  balanceOverview: {
    current_balance: number;
    payment_required: number;
    remaining_statement_balance: number;
    credit_limit: number;
  } = {
    current_balance: 0,
    payment_required: 0,
    remaining_statement_balance: 0,
    credit_limit: 0,
  };

  /**
   * balance overview
   *
   * total balance is all transaction that are from the 15th of last month to now
   * required payment is if balance is not 0 and it's 5 days to the 1st of the next month
   * remaining statement balance if there is a debt from last or more money not paid in full
   */
  ngOnInit(): void {
    const activeCard = this.ccService.getActiceCardState();
    const newDate = new Date();
    const start = startOfMonth(newDate);
    const end = addDays(start, 7);
    this.balanceOverview = {
      current_balance: activeCard.balance,
      payment_required: isWithinInterval(newDate, { start, end })
        ? 0
        : activeCard.balance ?? 0,
      remaining_statement_balance: activeCard.remainingBalance,
      credit_limit: activeCard.creditLimit,
    };

    console.log(
      "Balance overview is",
      this.balanceOverview,
      newDate,
      start,
      end
    );
  }
}
