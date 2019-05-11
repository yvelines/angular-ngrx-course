import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

import { AppState } from '../../store/reducers';
import { Course } from '../model/course';
import { CourseDispatcherService } from '../store/course/course.dispatchers';
import { selectCourseById } from '../store/course/course.selectors';


@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(
        private store$: Store<AppState>,
        private courseDispatcherService: CourseDispatcherService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Course> {
        const { id: courseId } = route.params;

        return this.store$
            .pipe(
                select(selectCourseById(courseId)),
                tap((course) => {
                    if (!course) {
                        this.courseDispatcherService.dispatchCourseRequestedAction(courseId);
                    }
                }),
                filter((course) => !!course),
                first()
            );
    }
}

