import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { LessonsDataSource } from '../services/lessons.datasource';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course: Course;

    dataSource: LessonsDataSource;

    displayedColumns = ['seqNo', 'description', 'duration'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private store$: Store<AppState>,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.selectedCourse(this.route.snapshot.data.course);
        this.dataSource = new LessonsDataSource(this.store$);
        this.dataSource.loadLessons(this.course.id, 0, 3);
    }

    ngAfterViewInit() {

        this.paginator.page
            .pipe(
                tap(() => this.loadLessonsPage())
            )
            .subscribe();

    }

    loadLessonsPage() {
        // this.dataSource.loadLessons(this.course.id,     );
    }

    selectedCourse(course: Course) {
        this.course = course;
    }
}
