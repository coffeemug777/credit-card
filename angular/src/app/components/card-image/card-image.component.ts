import { Component, inject, OnInit } from "@angular/core";
import { CcService } from "../../services/cc.service";
import { Card } from "../../model/card";

@Component({
  selector: "app-card-image",
  imports: [],
  templateUrl: "./card-image.component.html",
  styleUrl: "./card-image.component.scss",
})
export class CardImageComponent implements OnInit {
  private ccService = inject(CcService);

  imageUrl: string = "";

  ngOnInit() {
    this.ccService.getActiveCard().subscribe({
      next: (response: Card) => {
        console.log("Active card Image is ", response.image);
        this.imageUrl = response.image;
        this.ccService.setActiveCardState(response);
      },
      error: (error: Error) => {
        console.log("Error getting active Card Image", error);
      },
    });
  }
}
