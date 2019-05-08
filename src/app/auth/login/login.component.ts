import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { tap, catchError } from 'rxjs/operators';
import { noop, of } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../../store/reducers';
import { pipe } from '@angular/core/src/render3';
import { User } from '../../model/user.model';
import * as featureAuthActions from '../store/auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store$: Store<AppState>
  ) {

    this.form = this.fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() { }

  login() {
    const { email, password } = this.form.value;
    this.auth.login(email, password)
      .pipe(
        tap((user: User) => {
          this.store$.dispatch(new featureAuthActions.LoginAction({ user }));
          this.router.navigateByUrl('/courses');
        }),
        catchError((error) => { alert(`Login failed... ${error.status}`); return of(undefined); })
      ).subscribe();
  }
}
