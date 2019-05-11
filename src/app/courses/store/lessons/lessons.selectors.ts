import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PageQuery } from './lessons.actions';
import * as fromLessons from './lessons.reducers';
import { Lesson } from '../../model/lesson';


const calcPagination = (page: PageQuery): [number, number] => {
    return [
        page.pageIndex * page.pageSize,
        (page.pageIndex * page.pageSize) + page.pageSize
    ];
};

export const selectLessonstate = createFeatureSelector<fromLessons.LessonState>('lessons');

export const selectAllLessons = createSelector(
    selectLessonstate,
    fromLessons.selectAll
);

export const selectLessonsPage = (courseId: number, page: PageQuery) => createSelector(
    selectAllLessons,
    allLessons => {
        const [start, end] = calcPagination(page);
        return allLessons.filter((lesson: Lesson) => lesson.courseId === courseId).slice(start, end);
    }
);

export const selectLessonsLoading = createSelector(
    selectLessonstate,
    state => state.loading
);



