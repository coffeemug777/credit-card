import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { CcService } from "../../services/cc.service";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-login",
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [],
  styleUrls: ["./login.component.css"],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  private readonly ccService = inject(CcService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    console.log("LoginComponent initialized");
    //TODO: remove debug logic below
    this.login();
  }

  login() {
    this.ccService.login();
    this.router.navigate(["/dashboard"]);
  }
}
