import { Action } from '@ngrx/store';

import { Lesson } from '../model/lesson';

interface PageQuery {
    pageIndex: number;
    pageSize: number;
}

export enum LessonActionTypes {
    LessonsPageRequested = '[ Course landing page ] Lessons Page Requested',
    LessonsPageLoaded = '[ Lessons API ] Lessons Page Loaded',
    LessonsPageCancelled = '[ Lessons API ] Lessons Page Cancelled'
}

export class LessonsPageRequested implements Action {
    readonly type = LessonActionTypes.LessonsPageRequested;
    constructor(public payload: { courseId: number, page: PageQuery }) { }
}

export class LessonsPageLoaded implements Action {
    readonly type = LessonActionTypes.LessonsPageLoaded;
    constructor(public payload: { lessons: Lesson[] }) { }
}

export class LessonsPageCancelled implements Action {
    readonly type = LessonActionTypes.LessonsPageCancelled;
}


export type LessonsActions =
    LessonsPageRequested
    | LessonsPageLoaded
    | LessonsPageCancelled;


