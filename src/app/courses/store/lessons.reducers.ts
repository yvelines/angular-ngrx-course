import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Lesson } from '../model/lesson';
import { LessonsActions, LessonActionTypes } from './lessons.actions';

const sortByCourseAndseqNo = (l1: Lesson, l2: Lesson) => {
    const compare = l1.courseId - l2.courseId;
    return (compare !== 0) ? compare : (l1.seqNo - l2.seqNo)
};

export interface LessonState extends EntityState<Lesson> { }

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
    sortComparer: sortByCourseAndseqNo
});

const initialLessonsState = adapter.getInitialState();

export function lessonsReducer(state = initialLessonsState, action: LessonsActions): LessonState {

    switch (action.type) {
        case LessonActionTypes.LessonsPageRequested:
        case LessonActionTypes.LessonsPageLoaded:
        case LessonActionTypes.LessonsPageRequested:
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();

