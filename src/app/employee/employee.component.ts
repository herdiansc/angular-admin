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

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
    });
    this.getEmployees();
  }

  getEmployees() {
    this.employees = [];
    console.log(this.keyword);
    this.rest.getEmployees(this.keyword).subscribe((data: {}) => {
      console.log(data);
      this.employees = data;
    });
  }

  searchEmployees() {
    this.router.navigate(['/employee'], { queryParams: { keyword: this.keyword } });
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