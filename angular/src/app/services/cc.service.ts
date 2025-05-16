import { inject, Injectable } from "@angular/core";
import mockData from "../../assets/mock.json";
import { HttpClient } from "@angular/common/http";
import { Card } from "../model/card";
import { Transaction } from "../model/transaction";
import { User } from "../model/user";

const DB_URL = "http://localhost:8080";

@Injectable({
  providedIn: "root",
})
export class CcService {
  private persistentUser: User;
  private activeCardState: Card;
  private http: HttpClient = inject(HttpClient);

  constructor() {
    console.log("Mock data ", mockData);
    this.persistentUser = {} as User;
    this.activeCardState = {} as Card;
  }

  getActiveCard = () =>
    this.http.get<Card>(`${DB_URL}/card?id=${this.persistentUser.activeCard}`);

  getBalanceOverview() {
    return false;
  }

  getRecentActivities() {
    return this.http.get<Transaction[]>(
      `${DB_URL}/transaction/get-recent?cardNumber=${this.activeCardState.number}`
    );
  }

  setPersistentUser(user: User) {
    this.persistentUser = user;
  }

  getPersistenAccount() {
    return this.persistentUser;
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

  insertTransaction = (transaction: Transaction) =>
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
