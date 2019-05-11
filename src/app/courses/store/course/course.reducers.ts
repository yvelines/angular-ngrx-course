import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Course } from '../../model/course';
import { CourseActions, CourseActionTypes } from './course.actions';

// tslint:disable-next-line: no-empty-interface
export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCourseState: CoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export function coursesReducer(state: CoursesState = initialCourseState, action: CourseActions): CoursesState {
    switch (action.type) {
        case CourseActionTypes.CourseLoaded:
            return adapter.addOne(action.payload.course, state);

        case CourseActionTypes.AllCoursesLoaded:
            return adapter.addAll(action.payload.courses, { ...state, allCoursesLoaded: true });

        case CourseActionTypes.CourseSaved:
            return adapter.updateOne(action.payload.course, { ...state });

        default: {
            return state;
        }
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
