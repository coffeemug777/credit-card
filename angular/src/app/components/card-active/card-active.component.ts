import { Component, inject, OnInit } from "@angular/core";
import { CcService } from "../../services/cc.service";
import { Card } from "../../model/card";

@Component({
  selector: "app-card-active",
  imports: [],
  templateUrl: "./card-active.component.html",
  styleUrl: "./card-active.component.scss",
})
export class CardActiveComponent implements OnInit {
  private ccService = inject(CcService);
  activeCard: Card = {} as Card;

  ngOnInit() {
    this.ccService.getActiveCard().subscribe({
      next: (response: Card) => {
        console.log("Active card is ", response, response.name);
        this.activeCard = response;
      },
      error: (error: Error) => {
        console.log("Error getting active Card ", error);
      },
    });
  }
}
