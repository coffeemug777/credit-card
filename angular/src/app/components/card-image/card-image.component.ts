import { Component, inject, OnInit } from "@angular/core";
import { CcService } from "../../services/cc.service";

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
    this.imageUrl = this.ccService.getActiveCard()["image"];
  }
}
