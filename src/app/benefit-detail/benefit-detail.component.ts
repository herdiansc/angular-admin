import { Component, OnInit } from '@angular/core';
import { BenefitService } from '../benefit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-benefit-detail',
  templateUrl: './benefit-detail.component.html',
  styleUrls: ['./benefit-detail.component.css']
})
export class BenefitDetailComponent implements OnInit {

  benefit:any;

  constructor(public rest:BenefitService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getBenefit(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.benefit = data;
    });
  }

}