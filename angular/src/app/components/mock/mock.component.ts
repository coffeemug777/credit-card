import { Component, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { faker } from "@faker-js/faker";
import { CcService } from "../../services/cc.service";
import { format, sub } from "date-fns";

@Component({
  selector: "app-mock",
  imports: [MatButtonModule],
  templateUrl: "./mock.component.html",
  styleUrl: "./mock.component.scss",
})
export class MockComponent implements OnInit {
  ccService = inject(CcService);

  ngOnInit(): void {}

  onInsertNewTransaction() {
    const newDate = faker.date.recent();

    const newTransaction = {
      account_id: "1",
      description: faker.company.name(),
      card_id: "1",
      amount: Math.round(Math.random() * 100 * 100) / 100,
      type: "debit",
      date: newDate.toISOString(),
      date_group:
        newDate.getFullYear() +
        "" +
        (newDate.getMonth() + 1) +
        "" +
        newDate.getDate(),
    };

    this.ccService.insertTransaction(newTransaction);
  }

  onTwoMonthsGenerateTransactions() {
    const todayDate = format(new Date(), "yyyy-MM-dd");
    const twoMonthDate = format(sub(new Date(), { months: 2 }), "yyyy-MM-dd");

    let temp = [];
    for (let i = 0; i < 200; i++) {
      const newDate = faker.date.between({
        from: twoMonthDate,
        to: todayDate,
      });
      const newTransaction = {
        account_id: "1",
        description: faker.company.name(),
        card_id: "1",
        amount: Math.round(Math.random() * 100 * 100) / 100,
        type: "debit",
        date: newDate.toISOString(),
        date_group:
          newDate.getFullYear() +
          "" +
          (newDate.getMonth() + 1) +
          "" +
          newDate.getDate(),
      };

      temp.push(newTransaction);
    }

    temp.sort(
      (a, b) => new Date(a.date).getUTCDate() - new Date(b.date).getUTCDate()
    );
    temp.forEach((transaction) => {
      this.ccService.insertTransaction(transaction);
    });

    console.log("aaaa ", todayDate, twoMonthDate, temp);
  }
}
