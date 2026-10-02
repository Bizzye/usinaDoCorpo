import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';

import type { AppNotification } from '@app/core/models';
import { API_BASE_URL } from '@app/core/tokens/api-base-url.token';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getNotifications(): Observable<readonly AppNotification[]> {
    return this.http.get<readonly AppNotification[]>(`${this.baseUrl}/notifications.json`);
  }
}
