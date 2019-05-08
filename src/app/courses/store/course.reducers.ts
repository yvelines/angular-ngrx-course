import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Course } from '../model/course';

// tslint:disable-next-line: no-empty-interface
export interface CoursesState extends EntityState<Course> { }

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();
