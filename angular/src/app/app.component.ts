import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MockComponent } from "./components/mock/mock.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, MockComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "cc-project-angular";
}
