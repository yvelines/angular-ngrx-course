import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { CourseResolver } from './services/course.resolver';

export const coursesRoutes: Routes = [
    {
        path: '',
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
        RouterModule.forChild(coursesRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class CoursesRoutingModule {

    public static components = [
        HomeComponent,
        CourseComponent
    ];
}
