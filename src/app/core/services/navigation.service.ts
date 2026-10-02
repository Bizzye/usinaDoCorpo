import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import type { AppLink } from '@app/core/models';

const ALLOWED_EXTERNAL_PROTOCOLS = new Set(['https:', 'http:']);

/**
 * Single entry point for every navigation triggered by the UI.
 *
 * - internal links go through the Angular router;
 * - external links are validated (http/https only) and opened with `noopener,noreferrer`
 *   to prevent reverse tabnabbing;
 * - missing links (`null`) show a "coming soon" toast instead of failing silently.
 */
@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly router = inject(Router);
  private readonly toastController = inject(ToastController);
  private readonly window = inject(DOCUMENT).defaultView;

  async open(link: AppLink | null | undefined): Promise<void> {
    if (!link) {
      await this.showComingSoon();
      return;
    }

    if (link.type === 'internal') {
      await this.router.navigateByUrl(link.url);
      return;
    }

    const url = this.toSafeExternalUrl(link.url);
    if (!url) {
      console.warn(`[NavigationService] Blocked unsafe external url: ${link.url}`);
      return;
    }

    this.window?.open(url, '_blank', 'noopener,noreferrer');
  }

  private toSafeExternalUrl(raw: string): string | null {
    try {
      const url = new URL(raw);
      return ALLOWED_EXTERNAL_PROTOCOLS.has(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  private async showComingSoon(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Funcionalidade em desenvolvimento. Em breve!',
      duration: 2000,
      position: 'bottom',
      cssClass: 'app-toast',
    });
    await toast.present();
  }
}
