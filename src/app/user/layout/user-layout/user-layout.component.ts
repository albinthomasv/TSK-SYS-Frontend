import { Component } from '@angular/core';
import {SHARED_IMPORTS} from '../../../shared/shared.module';
import { UserSidebarComponent } from '../../components/user-sidebar/user-sidebar.component';
import { UserNavbarComponent } from '../../components/user-navbar/user-navbar.component';
@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [...SHARED_IMPORTS,UserSidebarComponent,UserNavbarComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
