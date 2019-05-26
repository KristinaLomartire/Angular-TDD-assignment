import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { Account } from '../account';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  account: Account;
  amount: number = null;
  balance: number;

  ngOnInit() {
    this.account = this.service.customerAccount;
  }
  constructor(private service: BankService) { }


  deposit(account: Account, amount: number){
    this.service.deposit(account, amount);
    this.amount = null;
  }

  Withdraw(account: Account, amount: number){
    this.service.withdraw(account, amount);
    this.amount = null;
  }

  viewBalance(account: Account){
    this.balance = this.service.getBalance(account);
  }

}
