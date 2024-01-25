import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true
})
export class NavComponent  implements OnInit {

  constructor(
    public _utils: UtilsService
  ) { }

  ngOnInit() {}

}
