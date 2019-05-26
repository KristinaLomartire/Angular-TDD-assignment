import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BankComponent } from './bank.component';
import { BankService } from '../bank.service';
import { Account } from '../account';

describe('BankComponent', () => {
  let component: BankComponent;
  let fixture: ComponentFixture<BankComponent>;
  let domElement;
  let mockAccount: Account = {
    customerName: 'Sven',
    balance: 300
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankComponent ],
      providers: [BankService],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankComponent);
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an element for balance with class accountBalance', () =>{
    let balance = domElement.querySelector('.accountBalance');
    expect(balance).toBeTruthy();
  });

  it('should have an inputfield for entering amount', () => {
    let input = domElement.querySelector('.enterAmount');
    expect(input).toBeTruthy();
  });

  it('should have a button with class depositButton', () => {
    let deposit = domElement.querySelector('.depositButton');
    expect(deposit).toBeTruthy();
  });

  it('should have a button with class withdrawButton', () => {
    let buttons: HTMLElement[] = Array.from(domElement.querySelectorAll('button'));
    let withdrawButton = buttons.find(b => b.classList.contains('withdrawButton'));
    expect(withdrawButton).toBeTruthy();

  });

describe('mock service', () => {


  it('should test getBalance function', () => {
    let expectedResult = mockAccount.balance;
    let mockService = jasmine.createSpyObj(['getBalance']);
    mockService.getBalance.and.returnValue(expectedResult);
    let component = new BankComponent(mockService);
    component.viewBalance(mockAccount);
    component.account = mockAccount;

    expect(component.account.balance).toBe(expectedResult);
    expect(mockService.getBalance).toHaveBeenCalled();
  });

  it('should test deposit function', () => {
    let current: any = mockAccount.balance;
    let dep = 200;
    let expectedResult = current + dep;
    let mockService = jasmine.createSpyObj(['deposit', 'getBalance']);
    mockService.deposit.and.returnValue(expectedResult);
    let component = new BankComponent(mockService);
    component.deposit( current, dep);
    component.account = mockAccount;

    expect(component.account.balance + dep).toBe(expectedResult);
    expect(mockService.deposit).toHaveBeenCalled();
  });

  it('should test withdraw function', () => {
    let current: any = mockAccount.balance;
    let minus = 50;
    let expectedResult = current - minus;
    let mockService = jasmine.createSpyObj(['withdraw']);
    mockService.withdraw
    let component = new BankComponent(mockService);
    component.Withdraw(current, minus);
    component.account = mockAccount;

    expect(component.account.balance - minus).toBe(expectedResult);
    expect(mockService.withdraw).toHaveBeenCalled();
  })

})


});
