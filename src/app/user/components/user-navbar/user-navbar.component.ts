import { Component, OnInit, OnDestroy } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared.module';
import { UtilityService } from '../../../services/common/utility.service';
import { LoaderService } from '../../../services/common/loader.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.scss'
})
export class UserNavbarComponent implements OnInit, OnDestroy {

  public showDropdown: boolean = false;
  public subscriptions = new Subscription();

  /**
   * The constructor of the UserNavbarComponent class.
   * @param loader The loader service that is used to show the loading indicator.
   * @param utils The utility service that is used to handle the logout process.
   * @param router The router that is used to navigate to the home page after logout.
   */
  constructor(private loader: LoaderService,
    private utils: UtilityService,
    private router: Router
  ) {

  }
  ngOnInit(): void {

  }

  /**
   * Lifecycle hook that is called when a directive, pipe, or service is destroyed.
   * Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

/**
 * Handles the user logout process by showing a confirmation dialog.
 * If confirmed, it triggers the logout process, shows a loading indicator,
 * and upon successful logout, displays a success message, clears the authentication token,
 * and redirects the user to the home page. If the logout request fails, the loading indicator is hidden.
 */

  userLogout() {
    this.showDropdown = false;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Want to logout now',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.loader.loaderStatus.emit(true)
        this.subscriptions.add(this.utils.userLogout().subscribe((res: any) => {
          this.loader.loaderStatus.emit(false);
          this.loader.toastSuccess("User successfully logged out")
          localStorage.removeItem(window.btoa("authToken"))
          this.router.navigate(['/'])

        }, () => {
          this.loader.loaderStatus.emit(false);
        }))
      }
    })
  }

}
