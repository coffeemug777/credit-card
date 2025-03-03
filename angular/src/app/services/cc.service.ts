import { inject, Injectable } from "@angular/core";
import mockData from "../../assets/mock.json";
import { firstValueFrom, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CcService {
  private persistentAccount: any;
  private http: HttpClient = inject(HttpClient);

  constructor() {
    console.log("Mock data ", mockData);
    this.persistentAccount = null;
  }

  getActiveCard() {
    return this.persistentAccount.cards[this.persistentAccount.active_card];
  }

  getBalanceOverview() {
    return false;
  }

  getRecentActivities() {
    return false;
  }

  async login() {
    this.persistentAccount = mockData.account[0];
    try {
      let response = await firstValueFrom(
        this.http.get<any>(
          "http://localhost:8080/account?id=67bbb2c799a203195fc2f300"
        )
      );
      console.log("response is ", response);
      this.persistentAccount = response;
    } catch (error) {
      console.error("Error in getting an account", error);
    }

    return of(this.persistentAccount);
  }
}
