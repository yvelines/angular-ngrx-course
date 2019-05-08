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
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CourseComponent } from './course/course.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { HomeComponent } from './home/home.component';
import { CourseResolver } from './services/course.resolver';
import { CoursesService } from './services/courses.service';
import { CourseEffects } from './store/course.effects';



export const coursesRoutes: Routes = [
    {
        path: "",
        component: HomeComponent

    },
    {
        path: ':id',
        component: CourseComponent,
        resolve: {
            course: CourseResolver
        }
    }
];



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
        RouterModule.forChild(coursesRoutes),
        EffectsModule.forFeature([CourseEffects])
    ],
    declarations: [HomeComponent, CoursesCardListComponent, CourseDialogComponent, CourseComponent],
    exports: [HomeComponent, CoursesCardListComponent, CourseDialogComponent, CourseComponent],
    entryComponents: [CourseDialogComponent],
    providers: [
        CoursesService,
        CourseResolver
    ]
})
export class CoursesModule {


}
