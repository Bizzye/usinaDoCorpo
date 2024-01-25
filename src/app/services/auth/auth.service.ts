import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser } from 'src/app/interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<IUser | null> = new BehaviorSubject(
    {
      avatar: '',
      hex: '#6a36e8',
      name: 'Leonardo Santos',
      nivel: 'Roxo'
    }
  );

  constructor() { }
}
