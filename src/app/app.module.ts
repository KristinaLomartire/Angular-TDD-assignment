import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BankComponent } from './bank/bank.component';
import { BankService } from './bank.service';

@NgModule({
  declarations: [
    AppComponent,
    BankComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    
  ],
  exports: [

  ],
  providers: [BankService],
  bootstrap: [AppComponent]
})
export class AppModule { }
