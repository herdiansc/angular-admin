import { Component, OnInit, Input } from '@angular/core';
import { BundlingService } from '../bundling.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bundling-add',
  templateUrl: './bundling-add.component.html',
  styleUrls: ['./bundling-add.component.css']
})
export class BundlingAddComponent implements OnInit {

  
  @Input() bundlingData = { id:null, title: '', price: '', description:'' };

  constructor(public rest:BundlingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  addBundling() {
    this.rest.addBundling(this.bundlingData).subscribe((result) => {
      this.router.navigate(['/bundling']);
    }, (err) => {
      console.log(err);
    });
  }

}