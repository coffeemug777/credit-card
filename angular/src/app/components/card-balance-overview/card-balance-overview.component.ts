import { Component, inject, OnInit } from "@angular/core";
import { CcService } from "../../services/cc.service";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-card-balance-overview",
  imports: [NgIf],
  templateUrl: "./card-balance-overview.component.html",
  styleUrl: "./card-balance-overview.component.scss",
})
export class CardBalanceOverviewComponent implements OnInit {
  private ccService = inject(CcService);
  balanceOverview: any;

  ngOnInit(): void {
    this.balanceOverview = this.ccService.getActiveCard()["balance_overview"];
  }
}
