import { Component,OnInit,Renderer2 } from '@angular/core';
import { LoaderService } from '../../services/common/loader.service';
import { Subscription } from 'rxjs';
import { SHARED_IMPORTS } from '../../shared/shared.module';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {

  public subscription=new Subscription();
  public loaderVisible: boolean = false;
  constructor(public loaderService: LoaderService,private renderer: Renderer2) { }


  ngOnInit(): void {
      this.subscription.add(this.loaderService.loaderStatus.subscribe((status: boolean) => {
        if (status) {
          this.loaderVisible = true;
          this.renderer.setStyle(document.body, 'height', '100vh');
          this.renderer.setStyle(document.body, 'overflow', 'hidden');
        } else {
          this.loaderVisible = false;
          this.renderer.removeStyle(document.body, 'height');
          this.renderer.removeStyle(document.body, 'overflow');
        }
        console.log(this.loaderVisible);
        
      }))
  }

}
