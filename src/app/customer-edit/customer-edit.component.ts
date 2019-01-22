import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  genders = [{code:'m', label:'Male'}, {code:'f', label:'Female'}];

  @Input() customerData:any = { id:null, first_name: '', last_name: '', email:'', gender:'', address:'' };

  constructor(public rest:CustomerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getCustomer(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.customerData = data;
    });
  }

  updateCustomer() {
    this.rest.updateCustomer(this.route.snapshot.params['id'], this.customerData).subscribe((result) => {
    console.log('result');
      this.router.navigate(['/customer/detail/'+result.body.id]);
    }, (err) => {
      console.log(err);
    });
  }

}