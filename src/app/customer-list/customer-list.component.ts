import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers:any = [];

  keyword: any;
  limit: number;
  page: number;

  constructor(public rest:CustomerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
      this.limit = params['limit'] ? params['limit'] : 10;
      this.page = params['page'] ? params['page'] : 1 ;
    });
    this.getCustomers();
  }

  getCustomers() {
    this.customers = {body:[], x_total_count:0};

    this.rest.getCustomers(this.keyword, this.page, this.limit).subscribe((data: {}) => {
      this.customers = data;
    });
  }

  reloadCustomers(page: number=1) {
    this.page = page;
    this.router.navigate(['/customer'], { queryParams: { keyword: this.keyword, limit: this.limit, page:this.page } });
    this.getCustomers();
  }

  add() {
    this.router.navigate(['/customer/add']);
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this.rest.deleteCustomer(id)
        .subscribe(res => {
            this.getCustomers();
          }, (err) => {
            console.log(err);
          }
        );
    }
  }

}