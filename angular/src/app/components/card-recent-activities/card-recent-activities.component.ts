import { Component, inject, OnInit } from "@angular/core";
import { CcService } from "../../services/cc.service";
import {
  CurrencyPipe,
  DatePipe,
  KeyValuePipe,
  NgFor,
  NgIf,
} from "@angular/common";

@Component({
  selector: "app-card-recent-activities",
  imports: [NgFor, DatePipe, NgIf, KeyValuePipe, CurrencyPipe],
  templateUrl: "./card-recent-activities.component.html",
  styleUrl: "./card-recent-activities.component.scss",
})
export class CardRecentActivitiesComponent implements OnInit {
  private ccService = inject(CcService);
  transactions: any[] = [];
  transactionMap = new Map();

  /** ngOnInit
   * get raw transactions, sort by date and then group them byday
   */
  async ngOnInit(): Promise<void> {
    const rawTransaction: any[] = await this.ccService.getRecentActivities();

    const sortedRawTransaction = rawTransaction.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    sortedRawTransaction.forEach((transaction) => {
      const dateString = new Date(transaction.date).toISOString().split("T")[0];
      this.transactionMap.has(dateString)
        ? this.transactionMap.get(dateString).push(transaction)
        : this.transactionMap.set(dateString, [transaction]);
    });
  }
}
