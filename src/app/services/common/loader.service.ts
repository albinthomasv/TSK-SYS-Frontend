import { Injectable,EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderStatus = new EventEmitter<boolean>();
  


  constructor(private toast:ToastrService) { }

/**
 * Displays a success toast notification.
 * 
 * @param message - The message to be displayed in the toast. Defaults to an empty string.
 * 
 * @remarks
 * This method uses the ngx-toastr service to display a success message with the title "Success".
 * The toast is positioned at the top-right of the screen, has a timeout of 5000 milliseconds, 
 * and includes a progress bar.
 */

  toastSuccess(message=""){
    this.toast.success(message,"Success",{
      positionClass: 'toast-top-right',
      timeOut: 5000,
      progressBar:true
    })
  }

/**
 * Displays an error toast notification.
 * 
 * @param message - The message to be displayed in the toast. Defaults to an empty string.
 * 
 * @remarks
 * This method uses the ngx-toastr service to display an error message with the title "Error".
 * The toast is positioned at the top-right of the screen, has a timeout of 5000 milliseconds, 
 * and includes a progress bar.
 */

  toastError(message=""){
    this.toast.error(message,"Error",{
      positionClass: 'toast-top-right',
      timeOut: 5000,
      progressBar:true
    })
  }
}
