import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Update } from '@ngrx/entity';
import { tap } from 'rxjs/operators';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CourseDispatcherService } from '../store/course/course.dispatchers';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

    courseId: number;

    form: FormGroup;
    description: string;

    constructor(
        private coursesService: CoursesService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        private courseDispatcherService: CourseDispatcherService,
        @Inject(MAT_DIALOG_DATA) course: Course) {

        this.courseId = course.id;

        this.description = course.description;


        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            longDescription: [course.longDescription, Validators.required],
            promo: [course.promo, []]
        });

    }

    ngOnInit() { }

    save() {

        const changes = this.form.value;

        this.coursesService.saveCourse(this.courseId, changes)
            .pipe(
                tap(() => this.onSavingCourse(changes))
            ).subscribe();
    }

    close() {
        this.dialogRef.close();
    }

    private onSavingCourse(updatedCourse: Partial<Course>) {
        this.dialogRef.close();

        const course: Update<Course> = {
            id: this.courseId,
            changes: updatedCourse
        };

        this.courseDispatcherService.dispatchCourseSavedAction(course);
    }

}
