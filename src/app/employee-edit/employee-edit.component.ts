import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  @Input() employeeData:any = { prod_name: '', prod_desc: '', prod_price:0 };

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getEmployee(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.employeeData = data;
    });
  }

  updateEmployee() {
    this.rest.updateEmployee(this.route.snapshot.params['id'], this.employeeData).subscribe((result) => {
      this.router.navigate(['/employee-details/'+result.id]);
    }, (err) => {
      console.log(err);
    });
  }

}