import { inject, Injectable } from "@angular/core";
import mockData from "../../assets/mock.json";
import { firstValueFrom, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
const DB_URL = "http://localhost:3000";

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

  async getRecentActivities(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.get(
          `${DB_URL}/transaction/${
            this.persistentAccount.cards[this.persistentAccount.active_card].id
          }`
        )
      );
      console.log("Response get recent activities ", response);
      return response;
    } catch (error) {
      console.log("Error ", error);
      return of([]);
    }
  }

  async login() {
    this.persistentAccount = mockData.account[0];
    try {
      let response = await firstValueFrom(
        this.http.get<any>(DB_URL + "/account?id=67bbb2c799a203195fc2f300")
      );
      console.log("response is ", response);
      this.persistentAccount = response;
    } catch (error) {
      console.error("Error in getting an account", error);
    }

    return of(this.persistentAccount);
  }

  async insertTransaction(transaction: any) {
    console.log("transaction ", transaction);
    try {
      const response = await firstValueFrom(
        this.http.post(DB_URL + "/transaction", transaction)
      );
      console.log("response from transaction insert is ", response);
    } catch (error) {
      console.log("Error posting to transaction for insert ", error);
    }
  }
}
