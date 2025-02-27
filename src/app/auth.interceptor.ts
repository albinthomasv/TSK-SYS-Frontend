import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { EncryptionService } from './services/common/encryption.service';
import { environment } from '../environments/environment';
import {  LoaderService} from './services/common/loader.service'
import { Router } from '@angular/router';
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  let modifiedReq = req;
  let authToken: any;
  const toaster = inject(LoaderService);
  const encryptService = inject(EncryptionService);
  const router=inject(Router);

  try{
    

    if (typeof window !== 'undefined') {
      authToken = encryptService.getFromLocalStorage(window.btoa('authToken'));
      
    }
    
    
  
    if(authToken){
        // Clone request to add Authorization header
     modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken?.access_token}`
      }
    });
    }

    modifiedReq=modifiedReq.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    
    

   
  }catch(err){
    console.log(err);
    

  }
  
  



  return next(modifiedReq).pipe(
    catchError((error) => {
      console.error('HTTP Error:', error);
      if(error?.error?.message){
        toaster.toastError(error?.error?.message);
        if(error?.status==401){
          encryptService.removeFromLocalStorage(window.btoa('authToken'));
          router.navigate(['/'])
        }
      }
      return throwError(() => error);
    })
  );
};
