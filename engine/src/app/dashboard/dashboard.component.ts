import { Component, OnInit } from '@angular/core';
import { ApiIntegrationService} from '../api-integration.service';
import { ToastrService } from 'ngx-toastr';
import { Http } from '@angular/http';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	public create: any;
  public rules: any;
  public id: any;

  constructor(
  		private data: ApiIntegrationService,
  		private toastr: ToastrService,
  		private http: Http,
      private router: Router
  	) { }

  onSubmit(create) {
  	this.data.newRule(create).subscribe((data) => {
      if(data['statusCode'] == 200) {
        this.toastr.success(data['message']);
        this.router.navigateByUrl('/dashboard');
      }
      else {
        this.toastr.error(data['message']);
        this.router.navigateByUrl('/dashboard');
      }
  	})
  }

  ngOnInit() {
  	this.create = {};
    this.getRules();
    this.isLogin();
  }

  getRules() {
    this.id="";
     this.data.rules(this.id).subscribe((rules) => {
       if(rules['statusCode'] == 200) {
         this.rules = rules['result'];
       }
     })
  }
  edit(id) {
    this.data.rules(id).subscribe((rules)=>{
      if(rules['statusCode'] == 200) {
        this.create = rules['result'][0];
        this.toastr.success(rules['message']);
        this.router.navigateByUrl('/dashboard');
      }
      else {
        this.toastr.error(rules['message']);
        this.router.navigateByUrl('/dashboard');
      }
    })
  }

  clear() {
    this.create = "";
  }

  isLogin() {
    if(!localStorage.getItem('_id')) {
      this.toastr.error('Please login first.');
      this.router.navigateByUrl('/');   
    }
  }

  logout() {
      localStorage.clear();
    }

}
