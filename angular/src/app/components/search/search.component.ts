import { Component } from "@angular/core";
import { MatFormField, MatInput } from "@angular/material/input";

@Component({
  selector: "app-search",
  imports: [MatInput, MatFormField],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.scss",
})
export class SearchComponent {}
