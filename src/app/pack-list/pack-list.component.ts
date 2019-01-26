import { Component, OnDestroy } from '@angular/core';
import { PackService } from '../pack.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-pack-list',
  templateUrl: './pack-list.component.html',
  styleUrls: ['./pack-list.component.css']
})
export class PackListComponent implements OnDestroy {

  packs:any = [];

  keyword: any;
  limit: number;
  page: number;

  navigationSubscription;

  constructor(public rest:PackService, private route: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getPacks();
      }
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getPacks() {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
      this.limit = params['limit'] ? params['limit'] : 10;
      this.page = params['page'] ? params['page'] : 1 ;
    });

    this.packs = {body:[], x_total_count:0};

    this.rest.getPacks(this.keyword, this.page, this.limit).subscribe((data: {}) => {
      this.packs = data;
    });
  }

  reloadPacks(page: number=1) {
    this.page = page;
    this.router.navigate(['/pack'], { queryParams: { keyword: this.keyword, limit: this.limit, page:this.page } });
  }

  add() {
    this.router.navigate(['/pack/add']);
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this.rest.deletePack(id)
        .subscribe(res => {
            this.getPacks();
          }, (err) => {
            console.log(err);
          }
        );
    }
  }

}