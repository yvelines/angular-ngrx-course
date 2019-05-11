import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../../store/reducers';
import { CoursesService } from '../services/courses.service';
import { AllCoursesLoaded, CourseActions, CourseActionTypes, CourseLoaded, CourseRequested } from './course.actions';
import { selectIsAllCoursesLoaded } from './course.selectors';


@Injectable()
export class CourseEffects {

    @Effect()
    loadCourse$ = this.actions$.pipe(
        ofType<CourseRequested>(CourseActionTypes.CourseRequested),
        mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
        map(course => new CourseLoaded({ course }))
    );

    @Effect()
    loadAllCourses$ = this.actions$.pipe(
        ofType<CourseRequested>(CourseActionTypes.AllCoursesRequested),
        withLatestFrom(this.store$.pipe(select(selectIsAllCoursesLoaded))),
        filter(([, isAllCoursesLoaded]: [CourseActions, boolean]) => !isAllCoursesLoaded),
        switchMap(() => this.coursesService.findAllCourses()),
        map(courses => new AllCoursesLoaded({ courses }))
    );

    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private store$: Store<AppState>
    ) { }


}
