

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from '../model/course';
import { map, catchError } from 'rxjs/operators';
import { Lesson } from '../model/lesson';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { LessonsPageCancelled } from '../store/lessons/lessons.actions';


@Injectable()
export class CoursesService {

    constructor(
        private http: HttpClient,
        private store$: Store<AppState>
    ) { }

    findCourseById(courseId: number): Observable<Course> {
        return this.http.get<Course>(`/api/courses/${courseId}`);
    }

    findAllCourses(): Observable<Course[]> {
        return this.http.get('/api/courses')
            .pipe(
                map(res => res['payload'])
            );
    }

    findAllCourseLessons(courseId: number): Observable<Lesson[]> {
        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('pageNumber', '0')
                .set('pageSize', '1000')
        }).pipe(
            map(res => res['payload'])
        );
    }

    findLessons(
        courseId: number,
        pageNumber = 0, pageSize = 3): Observable<Lesson[]> {

        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('filter', '')
                .set('sortOrder', 'asc')
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res => res['payload']),
            catchError(err => {
                console.log('error loading a lesson page', err);
                this.store$.dispatch(new LessonsPageCancelled());
                return of([]);
            }),
        );
    }


    saveCourse(courseId: number, changes: Partial<Course>) {
        return this.http.put('/api/courses/' + courseId, changes);
    }


}
