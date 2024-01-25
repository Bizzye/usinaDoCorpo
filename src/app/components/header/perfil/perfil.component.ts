import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject, Observable, delay } from 'rxjs';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule ]
})
export class PerfilComponent  implements OnInit {

  user$: Observable<IUser | null> = new BehaviorSubject(null);

  constructor(
    public _utils: UtilsService,
    private _auth: AuthService
  ) { }

  ngOnInit() {
    this.user$ = this._auth.user$;
  }

}
