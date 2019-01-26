import { Component, OnInit, Input } from '@angular/core';
import { PackService } from '../pack.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pack-add',
  templateUrl: './pack-add.component.html',
  styleUrls: ['./pack-add.component.css']
})
export class PackAddComponent implements OnInit {

  
  @Input() packData = { id:null, title: '', price: '', description:'' };

  constructor(public rest:PackService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  addPack() {
    this.rest.addPack(this.packData).subscribe((result) => {
      this.router.navigate(['/pack']);
    }, (err) => {
      console.log(err);
    });
  }

}