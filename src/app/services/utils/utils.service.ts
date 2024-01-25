import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private router: Router
  ) { }

  openLink(url: string, linkType: "Internal" | "External" = 'Internal') {
    if(linkType == 'Internal') {
      // this.router.navigate([url]);
      console.log(url);
      return
    }

    window.open(url, "_blank");
  }
}
