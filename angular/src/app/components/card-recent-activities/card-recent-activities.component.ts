import { Component, inject, OnInit } from "@angular/core";
import { CcService } from "../../services/cc.service";
import { DatePipe, JsonPipe, KeyValuePipe, NgFor, NgIf } from "@angular/common";

@Component({
  selector: "app-card-recent-activities",
  imports: [NgFor, DatePipe, NgIf],
  templateUrl: "./card-recent-activities.component.html",
  styleUrl: "./card-recent-activities.component.scss",
})
export class CardRecentActivitiesComponent implements OnInit {
  private ccService = inject(CcService);
  transactions: any;

  ngOnInit(): void {
    const rawTransaction = this.ccService.getActiveCard()["transactions"];
    this.transactions = rawTransaction.sort((a: any, b: any) => {
      console.log(a.date, b.date);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
}
