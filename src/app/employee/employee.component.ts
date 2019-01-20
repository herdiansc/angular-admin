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

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employees = [];
    this.rest.getEmployees().subscribe((data: {}) => {
      console.log(data);
      this.employees = data;
    });
  }

  add() {
    this.router.navigate(['/employee-add']);
  }

  delete(id) {
    this.rest.deleteEmployee(id)
      .subscribe(res => {
          this.getEmployees();
        }, (err) => {
          console.log(err);
        }
      );
  }

}