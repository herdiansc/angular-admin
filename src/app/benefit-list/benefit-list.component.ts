import { Component, OnDestroy } from '@angular/core';
import { BenefitService } from '../benefit.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-benefit-list',
  templateUrl: './benefit-list.component.html',
  styleUrls: ['./benefit-list.component.css']
})
export class BenefitListComponent implements OnDestroy {

  benefits:any = [];

  keyword: any;
  limit: number;
  page: number;

  navigationSubscription;

  constructor(public rest:BenefitService, private route: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getBenefits();
      }
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getBenefits() {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
      this.limit = params['limit'] ? params['limit'] : 10;
      this.page = params['page'] ? params['page'] : 1 ;
    });

    this.benefits = {body:[], x_total_count:0};

    this.rest.getBenefits(this.keyword, this.page, this.limit).subscribe((data: {}) => {
      this.benefits = data;
    });
  }

  reloadBenefits(page: number=1) {
    this.page = page;
    this.router.navigate(['/benefit'], { queryParams: { keyword: this.keyword, limit: this.limit, page:this.page } });
  }

  add() {
    this.router.navigate(['/benefit/add']);
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this.rest.deleteBenefit(id)
        .subscribe(res => {
            this.getBenefits();
          }, (err) => {
            console.log(err);
          }
        );
    }
  }

}