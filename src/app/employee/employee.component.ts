import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees:any = [];

  keyword: any;
  limit: number;
  page: number;

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
      this.limit = params['limit'] ? params['limit'] : 10;
      this.page = params['page'] ? params['page'] : 1 ;
    });
    this.getEmployees();
  }

  getEmployees() {
    this.employees = {body:[], x_total_count:0};

    this.rest.getEmployees(this.keyword, this.page, this.limit).subscribe((data: {}) => {
      this.employees = data;
    });
  }

  reloadEmployees(page: number=1) {
    this.page = page;
    this.router.navigate(['/employee'], { queryParams: { keyword: this.keyword, limit: this.limit, page:this.page } });
    this.getEmployees();
  }

  add() {
    this.router.navigate(['/employee/add']);
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this.rest.deleteEmployee(id)
        .subscribe(res => {
            this.getEmployees();
          }, (err) => {
            console.log(err);
          }
        );
    }
  }

}