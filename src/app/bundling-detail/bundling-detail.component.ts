import { Component, OnInit } from '@angular/core';
import { BundlingService } from '../bundling.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bundling-detail',
  templateUrl: './bundling-detail.component.html',
  styleUrls: ['./bundling-detail.component.css']
})
export class BundlingDetailComponent implements OnInit {

  bundling:any;

  constructor(public rest:BundlingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getBundling(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.bundling = data;
    });
  }

}