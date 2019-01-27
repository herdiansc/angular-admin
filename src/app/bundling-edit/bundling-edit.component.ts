import { Component, OnInit, Input } from '@angular/core';
import { BundlingService } from '../bundling.service';
import { PackService } from '../pack.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as $ from "jquery";
import 'select2';

@Component({
  selector: 'app-bundling-edit',
  templateUrl: './bundling-edit.component.html',
  styleUrls: ['./bundling-edit.component.css']
})
export class BundlingEditComponent implements OnInit {

  @Input() bundlingData:any = { id:null, title: '', price: '', description:'' };

  constructor(public rest:BundlingService, public pack:PackService, private route: ActivatedRoute, private router: Router) { }

  ngAfterViewInit() {
    $('#packId').select2({
      minimumInputLength: 2,
      ajax: {
        delay: 500,
        url: 'http://localhost:3000/packs',
        dataType: 'json',
data: function (params) {
      var query = {
        title_like: params.term
      }

      // Query parameters will be ?search=[term]&type=public
      return query;
    },
processResults: function (data) {
      // Tranforms the top-level key of the response object from 'items' to 'results'
      return {
        results: data.map(function(item) {
          return {id: item.id, text:item.title};
        })
      };
    }
      }
    });

    $('#benefitId').select2({
      minimumInputLength: 2,
      ajax: {
        delay: 500,
        url: 'http://localhost:3000/benefits',
        dataType: 'json',
data: function (params) {
      var query = {
        title_like: params.term
      }

      // Query parameters will be ?search=[term]&type=public
      return query;
    },
processResults: function (data) {
      // Tranforms the top-level key of the response object from 'items' to 'results'
      return {
        results: data.map(function(item) {
          return {id: item.id, text:item.title};
        })
      };
    }
      }
    });
  }

  ngOnInit() {
    this.rest.getBundling(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.bundlingData = data;
    });
  }

  // searchPack() {
  //   this.route.queryParams.subscribe(params => {
  //     this.packId = params['title_like'];
  //     this.limit = params['limit'] ? params['limit'] : 10;
  //     this.page = params['page'] ? params['page'] : 1 ;
  //   });

  //   this.packs = {body:[], x_total_count:0};

  //   this.rest.searchPack(this.keyword, this.page, this.limit).subscribe((data: {}) => {
  //     this.packs = data;
  //   });
  // }

  updateBundling() {
    this.rest.updateBundling(this.route.snapshot.params['id'], this.bundlingData).subscribe((result) => {
    console.log('result');
      this.router.navigate(['/bundling/detail/'+result.body.id]);
    }, (err) => {
      console.log(err);
    });
  }

}