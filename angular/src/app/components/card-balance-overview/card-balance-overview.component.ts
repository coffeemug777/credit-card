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
  balanceOverview: any;

  /**
   * balance overview
   *
   * total balance is all transaction that are from the 15th of last month to now
   * required payment is if balance is not 0 and it's 5 days to the 1st of the next month
   * remaining statement balance if there is a debt from last or more money not paid in full
   */
  ngOnInit(): void {
    this.ccService.getActiveCard().subscribe({
      next: (response: Card) => {
        const newDate = new Date();
        const start = startOfMonth(newDate);
        const end = addDays(start, 7);
        this.balanceOverview = {
          current_balance: response.balance,
          payment_required: isWithinInterval(newDate, { start, end }),
          remaining_statement_balance: response.remainingBalance,
          credit_limit: response.creditLimit,
        };
        console.log(
          "Balance overview is",
          this.balanceOverview,
          newDate,
          start,
          end
        );
        this.ccService.setActiveCardState(response);
      },
      error: (error: Error) => {
        console.log("Error getting active Card Image", error);
      },
    });
  }
}
