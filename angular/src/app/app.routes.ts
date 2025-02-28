import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { canActivateDashboardGuard } from "./guards/can-activate-dashboard.guard";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [canActivateDashboardGuard],
  },
];
