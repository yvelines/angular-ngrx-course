import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducers';

export const selectCoursesState = createFeatureSelector<fromCourse.CoursesState>('courses');

export const selectCourseById = (courseId: number) => createSelector(
    selectCoursesState,
    coursesState => coursesState.entities[courseId]
);

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourse.selectAll
)