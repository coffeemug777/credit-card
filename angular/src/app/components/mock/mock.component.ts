import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { faker } from "@faker-js/faker";
import { CcService } from "../../services/cc.service";

@Component({
  selector: "app-mock",
  imports: [MatButtonModule],
  templateUrl: "./mock.component.html",
  styleUrl: "./mock.component.scss",
})
export class MockComponent {
  ccService = inject(CcService);

  onInsertNewTransaction() {
    const newTransaction = {
      id: "1",
      account_id: "1",
      description: faker.company.name(),
      card_id: "1",
      amount: Math.round(Math.random() * 100 * 100) / 100,
      type: "debit",
      date: faker.date.recent(),
    };

    this.ccService.insertTransaction(newTransaction);
  }
}
