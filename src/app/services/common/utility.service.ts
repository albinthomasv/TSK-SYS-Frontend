import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public baseUrl = environment.baseUrl

  public userLoginUrl:string = 'user/login';

  public userLogoutUrl:string="user/logout";



  constructor(public http:HttpClient) { }


  /**
   * User login API
   * 
   * @param data - The data to be sent for user login
   * @returns An observable of the response from the API
   */
  userLogin(data:any):Observable<any>{

    return this.http.post(this.baseUrl+this.userLoginUrl,data);

  }


  userLogout(){
    return this.http.post(this.baseUrl+this.userLogoutUrl,'');
  }



}
