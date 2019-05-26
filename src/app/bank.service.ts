import { Injectable } from '@angular/core';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class BankService {

 customerAccount: Account =
    {
      customerName: 'Sven',
      balance: 300,
    }


  constructor() { }


  getBalance(account: Account): number {

    if(isNaN(account.balance) || account.balance === null){
      throw new Error('Balance can not be NaN or null');
    }
    else if (account.customerName === ''){
      throw new Error('You must enter a correct name');
    }
    else if (account.balance < 0){
      throw new Error('Can´t be a negative number');
    }
    else {
      return account.balance;
    }

  }
  //getBalance end.

  deposit(account: Account, amount: number):void {
    if(isNaN(amount) || amount < 0 || amount === null){
      throw new Error('Enter a valid amount');
    }
    else if(account.customerName === ''){
      throw new Error('You must enter a correct name')
    }
    else{
      account.balance += +amount;
    }
  }
  //deposit end.

  withdraw(account: Account, amount: number):void {
    console.log('withdraw is running');
    if(isNaN(amount) || amount < 0 || amount === null){
      throw new Error('Enter a valid amount');
    }
    else if(account.customerName === ''){
      throw new Error('You must enter a correct name');
    }
    else if(account.balance < amount){
      throw new Error('You have no credit');
    }
    else{
      account.balance -= amount;
    }
  }
  //withdraw end.

  transfer(from: Account, to: Account, amount: number): void{
    if(from.balance < amount){
      throw new Error('To low on funds');
    }
    else if(amount === 0){
      throw new Error('To low to transfer');
    }
    else if(amount === null || isNaN(amount)){
      throw new Error('Null or NaN is not allowed');
    }
    else{
      from.balance -= amount;
      to.balance += +amount;
    }
  }
  //transfer end.
}
