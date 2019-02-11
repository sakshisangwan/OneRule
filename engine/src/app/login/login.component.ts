import { Component, OnInit } from '@angular/core';
import { ApiIntegrationService} from '../api-integration.service';
import { ToastrService } from 'ngx-toastr';
import { Http } from '@angular/http';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public login: any

  constructor(
  		private data: ApiIntegrationService,
  		private toastr: ToastrService,
  		private http: Http,
  		private router: Router
  	) { }

	loginSubmit(login) {
	  	this.data.login(login).subscribe((data) => {
	  		if(data['statusCode'] ==200){
				var x = data['result']
				localStorage.setItem('_id',x['_id'])
				localStorage.setItem('email',x['email'])
				localStorage.setItem('userName',x['userName'])

				this.router.navigateByUrl('/dashboard');
				this.toastr.success(data['message']);
			}
	  	})
	}

	ngOnInit() {
		this.login={ }
	}

}
