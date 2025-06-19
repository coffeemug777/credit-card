import { Component, inject, OnInit } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
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
    ReactiveFormsModule,
  ],
  providers: [],
  styleUrls: ["./login.component.scss"],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  private readonly ccService = inject(CcService);
  private readonly router = inject(Router);

  userName = new FormControl("Johndoe");
  password = new FormControl("password123");

  ngOnInit(): void {
    console.log("LoginComponent initialized");
    //TODO: remove debug logic below
    //this.login();
  }

  login() {
    this.ccService
      .login(this.userName.value || "", this.password.value || "")
      .subscribe({
        next: async (response) => {
          this.ccService.setPersistentUser(response);

          this.ccService.setActiveCardState(
            await firstValueFrom(this.ccService.getActiveCard())
          );
          console.log(
            "Login success ",
            this.ccService.getActiceCardState(),
            this.ccService.getPersistenAccount()
          );

          this.router.navigate(["/dashboard"]);
        },
        error: (error) => {
          console.log("Login Error ", error);
        },
      });
  }
}
