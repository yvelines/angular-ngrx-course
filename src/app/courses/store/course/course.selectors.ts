import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducers';
import { Course } from '../../model/course';

export const selectCoursesState = createFeatureSelector<fromCourse.CoursesState>('courses');

export const selectCourseById = (courseId: number) => createSelector(
    selectCoursesState,
    coursesState => coursesState.entities[courseId]
);

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourse.selectAll
);

export const selectCoursesByCategory = createSelector(
    selectAllCourses,
    (courses: Course[], category) => courses.filter(course => course.category === category)
);

export const selectCountCoursesInPromo = createSelector(
    selectAllCourses,
    (courses: Course[]) => courses.filter(course => course.promo).length
);

export const selectIsAllCoursesLoaded = createSelector(
    selectCoursesState,
    coursesState => coursesState.allCoursesLoaded
)