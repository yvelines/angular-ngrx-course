import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as featureAuthActions from './auth/auth.actions';
import { AppState } from './reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private store$: Store<AppState>
  ) { }

  ngOnInit() { }

  logout() {
    this.store$.dispatch(new featureAuthActions.LogoutAction());
    this.router.navigateByUrl('/');
  }


}
