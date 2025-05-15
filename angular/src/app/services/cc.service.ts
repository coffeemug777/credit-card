import { inject, Injectable } from "@angular/core";
import mockData from "../../assets/mock.json";
import { firstValueFrom, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Card } from "../model/card";
const DB_URL = "http://localhost:8080";

@Injectable({
  providedIn: "root",
})
export class CcService {
  private persistentAccount: any;
  private activeCardState: Card;
  private http: HttpClient = inject(HttpClient);

  constructor() {
    console.log("Mock data ", mockData);
    this.persistentAccount = null;
    this.activeCardState = {} as Card;
  }

  getActiveCard = () =>
    this.http.get<Card>(
      `${DB_URL}/card?id=${this.persistentAccount.activeCard}`
    );

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

  setPersistenAccount(account: any) {
    this.persistentAccount = account;
  }

  getPersistenAccount() {
    return this.persistentAccount;
  }

  getActiceCardState() {
    return this.activeCardState;
  }

  setActiveCardState(card: Card) {
    this.activeCardState = card;
  }

  async login() {
    try {
      let response = await firstValueFrom(
        this.http.get<any>(DB_URL + "/user?id=2")
      );
      console.log("Login response is ", response);
      this.setPersistenAccount(response);
    } catch (error) {
      console.error("Error in getting an account", error);
    }

    return of(this.persistentAccount);
  }

  insertTransaction = (transaction: any) =>
    this.http.post(DB_URL + "/transaction", transaction);
}
