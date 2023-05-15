import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-task-bar',
  templateUrl: './task-bar.component.html',
  styleUrls: ['./task-bar.component.scss'],
})
export class TaskBarLayoutComponent implements OnDestroy {
  title = 'LocalMarketer';
  color = '';
  user: User | null = {};
  isAdministrator: boolean = false;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events.subscribe(() => {
      let path = this.router.url;
      if (path.includes('clients')) {
        this.color = 'clients-color';
      } else if (path.includes('profiles')) {
        this.color = 'profiles-color';
      } else if (path.includes('todos')) {
        this.color = 'todos-color';
      } else if (path.includes('deals')) {
        this.color = 'deals-color';
      } else if (path.includes('users')) {
        this.color = 'users-color';
      } else {
        this.color = '';
      }
    });
  }

  async ngOnInit() {
    this.user = await this.localStorage.getItem<User>('user');
    if (this.user?.role == 'Administrator') {
      this.isAdministrator = true;
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
