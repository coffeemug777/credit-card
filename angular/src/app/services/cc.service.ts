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

  getRecentActivities() {
    console.log(
      "bbbb ",
      `${DB_URL}/transaction/get-list?cardNumber=${this.activeCardState.number}`
    );
    return this.http.get(
      `${DB_URL}/transaction/get-list?cardNumber=${this.activeCardState.number}`
    );
  }

  setPersistentAccount(account: any) {
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

  login(userName: string, password: string) {
    return this.http.post<any>(DB_URL + "/user/user-name-password", {
      userName,
      password,
    });
  }

  insertTransaction = (transaction: any) =>
    this.http.post(DB_URL + "/transaction", transaction);

  deleteAllTransaction() {
    this.http
      .post(DB_URL + "/transaction/delete-all", { deleteAll: true })
      .subscribe({
        next: () => console.log("Delete all done"),
        error: (error) => console.log("Delete all transaction failed ", error),
      });
  }
}
