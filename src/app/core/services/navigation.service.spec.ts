import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let router: jasmine.SpyObj<Router>;
  let toastController: jasmine.SpyObj<ToastController>;
  let toast: jasmine.SpyObj<HTMLIonToastElement>;
  let windowOpen: jasmine.Spy;

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
    router.navigateByUrl.and.resolveTo(true);

    toast = jasmine.createSpyObj<HTMLIonToastElement>('HTMLIonToastElement', ['present']);
    toast.present.and.resolveTo();

    toastController = jasmine.createSpyObj<ToastController>('ToastController', ['create']);
    toastController.create.and.resolveTo(toast);

    windowOpen = spyOn(window, 'open');

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: ToastController, useValue: toastController },
      ],
    });
    service = TestBed.inject(NavigationService);
  });

  it('should show a "coming soon" toast when there is no link', async () => {
    await service.open(null);

    expect(toastController.create).toHaveBeenCalledWith(
      jasmine.objectContaining({ message: 'Funcionalidade em desenvolvimento. Em breve!' }),
    );
    expect(toast.present).toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(windowOpen).not.toHaveBeenCalled();
  });

  it('should navigate with the router for internal links', async () => {
    await service.open({ type: 'internal', url: '/about' });

    expect(router.navigateByUrl).toHaveBeenCalledWith('/about');
    expect(windowOpen).not.toHaveBeenCalled();
  });

  it('should open external https links in a new context without opener', async () => {
    await service.open({ type: 'external', url: 'https://github.com/Bizzye' });

    expect(windowOpen).toHaveBeenCalledWith(
      'https://github.com/Bizzye',
      '_blank',
      'noopener,noreferrer',
    );
  });

  for (const unsafeUrl of [
    'javascript:alert(1)',
    'data:text/html,<script></script>',
    'not a url',
  ]) {
    it(`should block the unsafe external url "${unsafeUrl}"`, async () => {
      const warn = spyOn(console, 'warn');

      await service.open({ type: 'external', url: unsafeUrl });

      expect(windowOpen).not.toHaveBeenCalled();
      expect(warn).toHaveBeenCalled();
    });
  }
});
