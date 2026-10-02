import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { type Observable, map } from 'rxjs';

import type { User } from '@app/core/models';
import { API_BASE_URL } from '@app/core/tokens/api-base-url.token';

const HEX_COLOR = /^#(?:[0-9a-f]{3}){1,2}$/i;

export const DEFAULT_LEVEL_COLOR = '#6a36e8';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  /** Returns the logged user. Values coming from the API are normalized before reaching the UI. */
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user.json`).pipe(
      map((user) => ({
        ...user,
        levelColor: HEX_COLOR.test(user.levelColor) ? user.levelColor : DEFAULT_LEVEL_COLOR,
      })),
    );
  }
}
