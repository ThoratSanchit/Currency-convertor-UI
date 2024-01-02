import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from './service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CurrencyConvertor';
currency:any;
loading = false; 
submitted = false;
currencyList: any[] = [
  { code: 'USD', name: 'United States Dollar' },
  {code:'INR', name:'Indian Ruppes'},
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound Sterling' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan Renminbi' },
  { code: 'SEK', name: 'Swedish Krona' },

];


constructor(private fb:FormBuilder, private services: ServiceService, private http: HttpClient){}

ngOnInit(){
  this.currency=this.fb.group({
    from:[this.currencyList[0].code],
    to:[this.currencyList[0].code],
    amount:['', Validators.required],
    result: ['']
  });
}


submit() {
  this.submitted = true;
  this.loading = true;

  console.log(this.currency.value);

  const requestData = {
    from: this.getCurrencyCodeByName(this.currency.value.from),
    to: this.getCurrencyCodeByName(this.currency.value.to),
    amount: this.currency.value.amount
  };

  this.services.postData(requestData).subscribe(
    (data) => {
      console.log(data);
      this.currency.patchValue({ result: data });
    },
    (error) => {
      console.error('Error converting currency:', error);
    }
  ).add(() => {
    // Set loading to false when the HTTP request is complete
    this.loading = false;
  });;
}

getCurrencyCodeByName(name: string): string | undefined {
  const currency = this.currencyList.find(c => c.name === name);
  return currency?.code;
}

isAmountInvalid() {
  const amountControl = this.currency.get('amount');
  const amountValue = parseFloat(amountControl.value);

  return amountControl.invalid || isNaN(amountValue) || amountValue <= 0;
}

clear() {
  this.submitted = false; 
  this.currency.patchValue({
    // from: this.currencyList[0].name,
    // to: this.currencyList[1].name,
    from:[''],
    to:[''],
    amount:[''] ,
    result: ['']
  });
}



}
