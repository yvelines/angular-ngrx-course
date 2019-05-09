import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store, Action } from '@ngrx/store';
import { filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../../store/reducers';
import { CoursesService } from '../services/courses.service';
import { AllCoursesLoaded, CourseActionTypes, CourseLoaded, CourseRequested, CourseActions } from './course.actions';
import { selectAllCourses, selectIsAllCoursesLoaded } from './course.selectors';


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
        filter(([action, isAllCoursesLoaded]: [CourseActions, boolean]) => !isAllCoursesLoaded),
        switchMap(() => this.coursesService.findAllCourses()),
        map(courses => new AllCoursesLoaded({ courses }))
    );

    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private store$: Store<AppState>
    ) { }


}
