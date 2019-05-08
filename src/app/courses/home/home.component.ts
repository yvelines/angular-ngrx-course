import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { AppState } from '../../store/reducers';
import { Store, select } from '@ngrx/store';
import { AllCoursesRequested } from '../store/course.actions';
import { selectAllCourses } from '../store/course.selectors';

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

        const courses$ = this.store$
            .pipe(
                select(selectAllCourses)
            );


        this.beginnerCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'BEGINNER'))
        );

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED'))
        );

        this.promoTotal$ = courses$.pipe(
            map(courses => courses.filter(course => course.promo).length)
        );

    }

}
