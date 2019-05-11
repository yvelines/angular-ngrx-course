import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { CoursesRoutingModule } from './courses.routing.module';
import { CourseResolver } from './services/course.resolver';
import { CoursesService } from './services/courses.service';
import { CourseDispatcherService } from './store/course/course.dispatchers';
import { CourseEffects } from './store/course/course.effects';
import { coursesReducer } from './store/course/course.reducers';
import { lessonsReducer } from './store/lessons/lessons.reducers';
import { LessonsEffects } from './store/lessons/lessons.effects';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        StoreModule.forFeature('courses', coursesReducer),
        StoreModule.forFeature('lessons', lessonsReducer),
        EffectsModule.forFeature([CourseEffects, LessonsEffects]),
        CoursesRoutingModule,
    ],
    declarations: [
        ...CoursesRoutingModule.components,
        CoursesCardListComponent,
        CourseDialogComponent
    ],
    exports: [
        ...CoursesRoutingModule.components,
        CoursesCardListComponent,
        CourseDialogComponent,
    ],
    entryComponents: [
        CourseDialogComponent
    ],
    providers: [
        CoursesService,
        CourseResolver,
        CourseDispatcherService
    ]
})
export class CoursesModule { }
