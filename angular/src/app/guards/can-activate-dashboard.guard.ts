import { CanActivateFn } from "@angular/router";
import { CcService } from "../services/cc.service";
import { inject } from "@angular/core";

export const canActivateDashboardGuard: CanActivateFn = (route, state) => {
  const ccService = inject(CcService);

  //TODO: probably use localStorage here instead of calling login here.
  ccService.login();
  return true;
};
