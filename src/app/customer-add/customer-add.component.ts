import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  genders = [{code:'m', label:'Male'}, {code:'f', label:'Female'}];
  
  @Input() customerData = { id:null, first_name: '', last_name: '', email:'', gender:'', address:'' };

  constructor(public rest:CustomerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  addCustomer() {
    this.rest.addCustomer(this.customerData).subscribe((result) => {
      this.router.navigate(['/customer']);
    }, (err) => {
      console.log(err);
    });
  }

}