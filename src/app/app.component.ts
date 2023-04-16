import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styleUrls: [],
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'LocalMarketer';

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  async ngOnInit(): Promise<void> {
    const user = await this.localStorage.getItem<User>('user');
    if (user == null) {
      this.router.navigateByUrl('/login');
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}