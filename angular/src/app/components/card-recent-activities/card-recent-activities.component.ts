import { Component, inject, OnInit } from "@angular/core";
import { CcService } from "../../services/cc.service";
import { CurrencyPipe, DatePipe, NgFor, NgIf } from "@angular/common";

@Component({
  selector: "app-card-recent-activities",
  imports: [NgFor, DatePipe, NgIf, CurrencyPipe],
  templateUrl: "./card-recent-activities.component.html",
  styleUrl: "./card-recent-activities.component.scss",
})
export class CardRecentActivitiesComponent implements OnInit {
  private ccService = inject(CcService);
  transactionsMap = new Map();
  sortedKeys: string[] = [];

  /** ngOnInit
   * get raw transactionsMaps, then group them byday
   */
  ngOnInit() {
    this.ccService.getRecentActivities().subscribe({
      next: (response) => {
        // group by date no time
        response.forEach((item) => {
          const date = new Date(item.date);
          const dateString =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();

          this.transactionsMap.has(dateString)
            ? this.transactionsMap.get(dateString).push(item)
            : this.transactionsMap.set(dateString, [item]);
        });

        // create sortedKeys because Angular doesn't respect Map sort
        this.sortedKeys = Array.from(this.transactionsMap.keys()).sort(
          (a: string, b: string) =>
            new Date(b).valueOf() - new Date(a).valueOf()
        );
        console.log(
          "Card Recent activities ",
          response,
          this.sortedKeys,
          this.transactionsMap
        );
      },
      error: (error) => {
        console.log("Card Recent activities Error ", error);
      },
    });
  }
}
