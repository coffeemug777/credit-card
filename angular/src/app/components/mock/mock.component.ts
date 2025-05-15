import { Component, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { faker } from "@faker-js/faker";
import { CcService } from "../../services/cc.service";
import { format, sub } from "date-fns";
import { Transaction } from "../../model/transaction";

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
    const newTransaction: Transaction = {
      cardNumber: this.ccService.getActiceCardState().number,
      description: faker.company.name(),
      amount: Math.round(Math.random() * 100 * 100) / 100,
      type: "debit",
      date: newDate,
    };
    console.log("new trans ", newTransaction);
    this.ccService.insertTransaction(newTransaction).subscribe({
      next: (response) => {
        console.log("response from transaction insert is ", response);
      },
      error: (error) => {
        console.log("Error posting to transaction for insert ", error);
      },
    });
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
        cardNumber: this.ccService.getActiceCardState().number,
        description: faker.company.name(),
        amount: Math.round(Math.random() * 100 * 100) / 100,
        type: "debit",
        date: newDate,
      };

      temp.push(newTransaction);
    }

    temp.sort(
      (a, b) => new Date(a.date).getUTCDate() - new Date(b.date).getUTCDate()
    );
    temp.forEach((transaction) => {
      this.ccService.insertTransaction(transaction).subscribe({
        next: () => console.log("Insert alot all done"),
        error: (error) => console.log("insert alot failed ", error),
      });
    });

    console.log("aaaa ", todayDate, twoMonthDate, temp);
  }

  onDeleteAll() {
    console.log("Here");
    this.ccService.deleteAllTransaction();
  }
}
