import { Component } from "@angular/core";
import { CardActiveComponent } from "../card-active/card-active.component";
import { CardImageComponent } from "../card-image/card-image.component";
import { CardBalanceOverviewComponent } from "../card-balance-overview/card-balance-overview.component";
import { CardRecentActivitiesComponent } from "../card-recent-activities/card-recent-activities.component";
import { SearchComponent } from "../search/search.component";
import { NavMainComponent } from "../nav-main/nav-main.component";
import { MatButton } from "@angular/material/button";

@Component({
  selector: "app-dashboard",
  imports: [
    CardActiveComponent,
    CardImageComponent,
    CardBalanceOverviewComponent,
    CardRecentActivitiesComponent,
    SearchComponent,
    NavMainComponent,
    MatButton,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}
