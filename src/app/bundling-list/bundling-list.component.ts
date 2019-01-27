import { Component, OnDestroy } from '@angular/core';
import { BundlingService } from '../bundling.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bundling-list',
  templateUrl: './bundling-list.component.html',
  styleUrls: ['./bundling-list.component.css']
})
export class BundlingListComponent implements OnDestroy {

  bundlings:any = [];

  keyword: any;
  limit: number;
  page: number;

  navigationSubscription;

  constructor(public rest:BundlingService, private route: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getBundlings();
      }
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getBundlings() {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
      this.limit = params['limit'] ? params['limit'] : 10;
      this.page = params['page'] ? params['page'] : 1 ;
    });

    this.bundlings = {body:[], x_total_count:0};

    this.rest.getBundlings(this.keyword, this.page, this.limit).subscribe((data: {}) => {
      this.bundlings = data;
    });
  }

  reloadBundlings(page: number=1) {
    this.page = page;
    this.router.navigate(['/bundling'], { queryParams: { keyword: this.keyword, limit: this.limit, page:this.page } });
  }

  add() {
    this.router.navigate(['/bundling/add']);
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this.rest.deleteBundling(id)
        .subscribe(res => {
            this.getBundlings();
          }, (err) => {
            console.log(err);
          }
        );
    }
  }

}