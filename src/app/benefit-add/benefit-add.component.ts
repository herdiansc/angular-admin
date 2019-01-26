import { Component, OnInit, Input } from '@angular/core';
import { BenefitService } from '../benefit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-benefit-add',
  templateUrl: './benefit-add.component.html',
  styleUrls: ['./benefit-add.component.css']
})
export class BenefitAddComponent implements OnInit {

  
  @Input() benefitData = { id:null, title: '', description:'' };

  constructor(public rest:BenefitService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  addBenefit() {
    this.rest.addBenefit(this.benefitData).subscribe((result) => {
      this.router.navigate(['/benefit']);
    }, (err) => {
      console.log(err);
    });
  }

}