import { Component, OnInit, Input } from '@angular/core';
import { BenefitService } from '../benefit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-benefit-edit',
  templateUrl: './benefit-edit.component.html',
  styleUrls: ['./benefit-edit.component.css']
})
export class BenefitEditComponent implements OnInit {

  @Input() benefitData:any = { id:null, title: '', description:'' };

  constructor(public rest:BenefitService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getBenefit(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.benefitData = data;
    });
  }

  updateBenefit() {
    this.rest.updateBenefit(this.route.snapshot.params['id'], this.benefitData).subscribe((result) => {
    console.log('result');
      this.router.navigate(['/benefit/detail/'+result.body.id]);
    }, (err) => {
      console.log(err);
    });
  }

}