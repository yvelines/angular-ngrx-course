import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { AppState } from '../../store/reducers';
import { Store, select } from '@ngrx/store';
import { AllCoursesRequested } from '../store/course.actions';
import { selectAllCourses, selectCoursesByCategory, selectCountCoursesInPromo } from '../store/course.selectors';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(
        private store$: Store<AppState>
    ) { }

    ngOnInit() {

        this.store$.dispatch(new AllCoursesRequested());

        this.beginnerCourses$ = this.store$.pipe(select(selectCoursesByCategory, 'BEGINNER'));
        this.advancedCourses$ = this.store$.pipe(select(selectCoursesByCategory, 'ADVANCED'));
        this.promoTotal$ = this.store$.pipe(select(selectCountCoursesInPromo));
    }

}
