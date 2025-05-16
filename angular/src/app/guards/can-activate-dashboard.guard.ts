import { CanActivateFn } from "@angular/router";
import { CcService } from "../services/cc.service";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";

export const canActivateDashboardGuard: CanActivateFn = async (
  route,
  state
) => {
  const ccService = inject(CcService);

  //TODO: probably use localStorage here instead of calling login here.
  ccService.setPersistentAccount(
    await firstValueFrom(ccService.login("Johndoe", "password123"))
  );
  ccService.setActiveCardState(await firstValueFrom(ccService.getActiveCard()));

  //  console.log("from guard ", result);
  return true;
};
