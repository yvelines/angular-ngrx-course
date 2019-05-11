import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/reducers';
import { Course } from '../model/course';
import { CourseSaved, CourseRequested } from './course.actions';

@Injectable()
export class CourseDispatcherService {

    constructor(
        private store$: Store<AppState>
    ) { }

    public dispatchCourseSavedAction(course: Update<Course>) {
        this.store$.dispatch(new CourseSaved({ course }));
    }

    public dispatchCourseRequestedAction(courseId: number) {
        this.store$.dispatch(new CourseRequested({ courseId }));
    }
}
