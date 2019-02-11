import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiIntegrationService {

  constructor(private http: HttpClient) { }
  public baseURL = 'http://localhost:9000/'

  newRule(data) {
  	return this.http.post(this.baseURL + 'createRule', data)
  }

  login(data) {
    return this.http.post(this.baseURL + 'userLogin', data)
  }

  rules(data) {
    return this.http.post(this.baseURL + 'getRules',data)
  }

}
