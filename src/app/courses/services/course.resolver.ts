import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap, first } from 'rxjs/operators';

import { AppState } from '../../store/reducers';
import { Course } from '../model/course';
import { CourseRequested } from '../store/course.actions';
import { selectCourseById } from '../store/course.selectors';
import { CoursesService } from './courses.service';


@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(
        private coursesService: CoursesService,
        private store$: Store<AppState>
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        const { id: courseId } = route.params;

        return this.store$
            .pipe(
                select(selectCourseById(courseId)),
                tap((course) => {
                    if (!course) {
                        this.store$.dispatch(new CourseRequested({ courseId }));
                    }
                }),
                filter((course) => !!course),
                first()
            );
    }
}

