import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = environment.baseUrl

  taskUrl:string = 'tasks'

  constructor(private http:HttpClient) { }

  getAllTasks(page=1,perPage=25,filter="pending",order="desc",sort_by="created_date"):Observable<any>{
    return this.http.get(this.baseUrl+this.taskUrl+`?per_page=${perPage}&page=${page}&sort_by=${sort_by}&sort_order=${order}&status=${filter}`);
  }

  createTask(data:any):Observable<any>{
    return this.http.post(this.baseUrl+this.taskUrl,data);
  }

  updateTask(data:any,slug:string):Observable<any>{
    return this.http.put(this.baseUrl+this.taskUrl+'/'+slug,data);
  }

  deleteTask(slug:string):Observable<any>{
    return this.http.delete(this.baseUrl+this.taskUrl+'/'+slug);
  }
}
