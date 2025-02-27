import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared.module';
@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.scss'
})
export class UserSidebarComponent {

}
