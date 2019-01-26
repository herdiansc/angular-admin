import { Component, OnInit, Input } from '@angular/core';
import { PackService } from '../pack.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pack-add',
  templateUrl: './pack-add.component.html',
  styleUrls: ['./pack-add.component.css']
})
export class PackAddComponent implements OnInit {

  genders = [{code:'m', label:'Male'}, {code:'f', label:'Female'}];
  
  @Input() packData = { id:null, first_name: '', last_name: '', email:'', gender:'', address:'' };

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