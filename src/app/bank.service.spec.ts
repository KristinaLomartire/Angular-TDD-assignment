import { TestBed } from '@angular/core/testing';
import { BankService } from './bank.service';
import { Account } from './account';


describe('BankService', () => {
  let service: BankService;
  let account: Account;
  let amount: number;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(BankService);
    account = {
      customerName: 'Sven',
      balance: 300
    }
  });




  amount = 500;


  describe('Function getBalance', () => {

    //testa att negativa tal inte accepteras

    it('should be a function', () => {
      let actual = service.getBalance(account);
      expect(actual).toBeTruthy();
    });

    it('should return account balance', () => {
      let expected = service.customerAccount.balance;
      let actual = service.getBalance(service.customerAccount);
      expect(actual).toBe(expected);
    });

    it('should only take number', () => {
      let actual = service.getBalance(account);
      expect(typeof actual).toBe('number');
    });

    it('should throw error if customerName is empty string', () =>{
      let noName: Account = {
        customerName: '',
        balance: 500
      };
      let dangerousCall = () => service.getBalance(noName);
      expect(dangerousCall).toThrow();

    });

    it('should throw an error if account balance is NaN', () => {
      let invalidBalance: Account = {
        customerName: 'Sven',
        balance: NaN
      };
      let dangerousCall = () => service.getBalance(invalidBalance);
      expect(dangerousCall).toThrow();
    });

    it('should throw an error if account balance is null', () => {
      let invalidBalance: Account = {
        customerName: 'Sven',
        balance: null
      };
      let dangerousCall = () => service.getBalance(invalidBalance);
      expect(dangerousCall).toThrow();
    });

    it('should throw error if negativ number', () => {
      let negBalance: Account = {
        customerName: 'Sven',
        balance: -0.999
      };
      let dangerousCall = () => service.getBalance(negBalance);
      expect(dangerousCall).toThrow();
  });


  describe('Function deposit', () => {

    it('should be a function', () => {
      let actual = service.deposit(service.customerAccount, amount);
      expect(actual).toBe(actual);
    });

    it('should throw error if customerName is empty string', () =>{
      let noName: Account = {
        customerName: '',
        balance: 500
      };
      let dangerousCall = () => service.getBalance(noName);
      expect(dangerousCall).toThrow();

    });

    it('should throw an error if deposit NaN', () => {
      let dangerousCall = () => service.deposit(account, NaN);
      expect(dangerousCall).toThrow();
    });

    it('should not be possible to deposit null', () => {
      let actual = () => service.deposit(account, null);
      expect(actual).not.toBeNull;
    });

    it('should be able to deposit funds', () => {
      let low = 0;
      let dep = 400;
      let former = account.balance;
      service.deposit(account, dep);
      let actual = service.getBalance(account);
      expect(actual).toBe(former + dep);
    });

    it('should throw error if amounts below zero', () => {
      let low = -0.009;
      let dangerousCall = () => {
        service.deposit(account, low);
      }
      expect(dangerousCall).toThrow();
    });
  });

  describe('Function withdraw', () => {

    it('should be a function', () => {

      expect(service.withdraw).toBeTruthy();
    });

    it('should throw error if customerName is empty string', () =>{
      let noName: Account = {
        customerName: '',
        balance: 500
      };
      let dangerousCall = () => service.getBalance(noName);
      expect(dangerousCall).toThrow();

    });

    it('should throw an error if withdraw NaN', () => {
      let dangerousCall = () => service.withdraw(account, NaN);
      expect(dangerousCall).toThrow();
    });

    it('should not be possible to withdraw null', () => {
      let actual = () => service.withdraw(account, null);
      expect(actual).not.toBeNull;
    });

    it('should only take amounts above zero', () => {
      let low = 0;
      let dep = 400;
      service.deposit(account, dep);
      let actual = service.getBalance(account);
      expect(actual).toBeGreaterThanOrEqual(low);
    });

    it('should throw error if amounts below zero', () => {
      let low = -0.009;
      let dangerousCall = () => {
        service.withdraw(account, low);
      }
      expect(dangerousCall).toThrow();
    });

    it('should throw an error if withdraw is larger than balance', () => {
      let badIntel: Account = {
        customerName: 'Sven',
        balance: 400
      };
      let amount = 401;
      let dangerousCall = () => {
        service.withdraw(badIntel, amount);
      };
      service.getBalance(account);
      expect(dangerousCall).toThrow();
    })
  });

  describe('Function transfer', () => {
    let accFrom: Account = {
      customerName: 'Sven',
      balance: 400
    };
    let accTo: Account = {
      customerName: 'Tage',
      balance: 600
    };

    it('should be a function', () => {
      expect(service.transfer).toBeTruthy();
    });

    it('should not allow transfers that overdraw account balance', () => {
      let amount = 401;
      let actual = () => service.transfer(accFrom, accTo, amount);
      expect(actual).toThrow();
    });

    it('should throw error if zero transfer', () => {
      let amount = 0;
      let actual = () => service.transfer(accFrom, accTo, amount);
      expect(actual).toThrow();
    });

    it('should throw error if null transfer', () => {
      let amount = null;
      let actual = () => service.transfer(accFrom, accTo, amount);
      expect(actual).toThrow();
    });

    it('should throw error if NaN transfer', () => {
      let amount = NaN;
      let actual = () => service.transfer(accFrom, accTo, amount);
      expect(actual).toThrow();
    });

  });

});
});
