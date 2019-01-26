import { Component, OnInit, Input } from '@angular/core';
import { PackService } from '../pack.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pack-edit',
  templateUrl: './pack-edit.component.html',
  styleUrls: ['./pack-edit.component.css']
})
export class PackEditComponent implements OnInit {

  genders = [{code:'m', label:'Male'}, {code:'f', label:'Female'}];

  @Input() packData:any = { id:null, first_name: '', last_name: '', email:'', gender:'', address:'' };

  constructor(public rest:PackService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getPack(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.packData = data;
    });
  }

  updatePack() {
    this.rest.updatePack(this.route.snapshot.params['id'], this.packData).subscribe((result) => {
    console.log('result');
      this.router.navigate(['/pack/detail/'+result.body.id]);
    }, (err) => {
      console.log(err);
    });
  }

}