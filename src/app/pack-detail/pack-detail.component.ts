import { Component, OnInit } from '@angular/core';
import { PackService } from '../pack.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pack-detail',
  templateUrl: './pack-detail.component.html',
  styleUrls: ['./pack-detail.component.css']
})
export class PackDetailComponent implements OnInit {

  pack:any;

  constructor(public rest:PackService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getPack(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.pack = data;
    });
  }

}