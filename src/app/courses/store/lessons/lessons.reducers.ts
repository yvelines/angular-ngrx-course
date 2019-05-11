import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Lesson } from '../../model/lesson';
import { LessonActionTypes, LessonsActions } from './lessons.actions';

const sortByCourseAndseqNo = (l1: Lesson, l2: Lesson) => {
    const compare = l1.courseId - l2.courseId;
    return (compare !== 0) ? compare : (l1.seqNo - l2.seqNo);
};

export interface LessonState extends EntityState<Lesson> {
    loading: boolean;
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
    sortComparer: sortByCourseAndseqNo
});

const initialLessonsState = adapter.getInitialState({
    loading: true
});

export function lessonsReducer(state = initialLessonsState, action: LessonsActions): LessonState {

    switch (action.type) {
        case LessonActionTypes.LessonsPageRequested:
            return {
                ...state,
                loading: true
            };
        case LessonActionTypes.LessonsPageLoaded:
            return adapter.addMany(action.payload.lessons, {
                ...state,
                loading: false
            });
        case LessonActionTypes.LessonsPageCancelled:
            return {
                ...state,
                loading: false
            };

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

