import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Lesson } from '../model/lesson';
import { LessonsActions, LessonActionTypes } from './lessons.actions';

export interface LessonState extends EntityState<Lesson> { }

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>();

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

