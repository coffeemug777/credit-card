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
  transaction: any;

  /** ngOnInit
   * get raw transactions, then group them byday
   */
  async ngOnInit(): Promise<void> {
    this.transaction = (await this.ccService.getRecentActivities()) || [];
  }
}
