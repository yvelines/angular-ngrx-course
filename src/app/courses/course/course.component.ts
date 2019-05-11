import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { AppState } from '../../store/reducers';
import { Course } from '../model/course';
import { LessonsDataSource } from '../services/lessons.datasource';
import { PageQuery } from '../store/lessons/lessons.actions';
import { Observable } from 'rxjs';
import { selectLessonsLoading } from '../store/lessons/lessons.selectors';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    course: Course;

    dataSource: LessonsDataSource;

    displayedColumns = ['seqNo', 'description', 'duration'];

    pageSize = 3;

    loading$: Observable<boolean>;

    constructor(
        private store$: Store<AppState>,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loading$ = this.store$.pipe(select(selectLessonsLoading));
        this.selectedCourse(this.route.snapshot.data.course);
        this.dataSource = new LessonsDataSource(this.store$);
        this.dataSource.loadLessons(this.course.id, this.getPaginatorState());
    }

    ngAfterViewInit() {

        this.paginator.page
            .pipe(
                tap(() => this.loadLessonsPage())
            ).subscribe();

    }

    loadLessonsPage() {
        this.dataSource.loadLessons(this.course.id, this.getPaginatorState());
    }

    selectedCourse(course: Course) {
        this.course = course;
    }

    private getPaginatorState(): PageQuery {
        return {
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize || this.pageSize
        };

    }
}
