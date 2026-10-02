import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';

import type { HomeSection } from '@app/core/models';
import { API_BASE_URL } from '@app/core/tokens/api-base-url.token';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getHomeSections(): Observable<readonly HomeSection[]> {
    return this.http.get<readonly HomeSection[]>(`${this.baseUrl}/home.json`);
  }
}
