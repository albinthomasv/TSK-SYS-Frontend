import { Component,OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import {SHARED_IMPORTS} from '../../shared/shared.module';
import { LoaderService } from '../../services/common/loader.service';
import { EncryptionService } from '../../services/common/encryption.service';
import { Subscription } from 'rxjs';
import { UtilityService } from '../../services/common/utility.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit,OnDestroy {
  public loginForm!: FormGroup;
  public submitted:boolean=false;
  private subscriptions= new Subscription();
  
  /**
   * The constructor of the LoginComponent class.
   * @param lgForm The form builder that is used to create the form group.
   * @param loader The loader service that is used to show the loading indicator.
   * @param encryption The encryption service that is used to encrypt the password.
   * @param userUtils The user utility service that is used to log in the user.
   * @param route The route that is used to navigate to the dashboard.
   */
  constructor(
    private lgForm:FormBuilder,
    private loader:LoaderService,
    private encryption:EncryptionService,
    private userUtils:UtilityService,
    private route: Router
   

  ) {}
  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * Initializes the form group.
   */
  ngOnInit(): void {
    
    this.loginForm = this.lgForm.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
    // this.toast.success('Welcome to Admin Panel');
  }

  /**
   * Lifecycle hook that is called when a directive, pipe, or service is destroyed.
   * Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
/**
 * Submits the login form.
 * 
 * If the form is valid, the loading indicator is displayed and the login request is sent.
 * On successful login, a success message is displayed, the authentication token is saved,
 * and the user is redirected to the tasks page.
 * If the login fails, the loading indicator is hidden.
 * 
 * The submitted flag is set to true when the form is submitted.
 */

  onSubmit(){
    this.submitted=true;
    if(this.loginForm.valid){
      this.loader.loaderStatus.next(true);
      this.userUtils.userLogin(this.loginForm.value).subscribe((res:any)=>{
        this.loader.loaderStatus.next(false);
        if(res?.success){
          this.loader.toastSuccess(res?.message);
          this.encryption.saveToLocalStorage(window.btoa('authToken'),res?.data);
          this.route.navigate(['/user/tasks']);
        }
      },(err:any)=>{
        this.loader.loaderStatus.next(false);
      })
      
    }
  }

  /**
   * Gets the errors for the email field in the login form.
   * 
   * @returns An object with the errors of the email field.
   * The object will be empty if the email is valid.
   */
  get emailErrors() {
    return this.loginForm.get('email')?.errors;
  }

  /**
   * Gets the errors for the password field in the login form.
   * 
   * @returns An object with the errors of the password field.
   * The object will be empty if the password is valid.
   */
  get passwordErrors() {
    return this.loginForm.get('password')?.errors;
  }
}
