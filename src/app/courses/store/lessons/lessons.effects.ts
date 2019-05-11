import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { AppState } from '../../../store/reducers';
import { CoursesService } from '../../services/courses.service';
import { LessonActionTypes, LessonsPageLoaded, LessonsPageRequested } from './lessons.actions';

@Injectable()
export class LessonsEffects {

    @Effect()
    loadLessonsPage$ = this.actions$
        .pipe(
            ofType<LessonsPageRequested>(LessonActionTypes.LessonsPageRequested),
            switchMap(({ payload }) => this.coursesService.findLessons(payload.courseId, payload.page.pageIndex, payload.page.pageSize)),
            map(lessons => {
                return new LessonsPageLoaded({ lessons });
            }),
        );

    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private store$: Store<AppState>
    ) { }

}
