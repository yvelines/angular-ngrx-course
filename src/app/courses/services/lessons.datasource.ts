import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { Lesson } from '../model/lesson';
import { CoursesService } from './courses.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { PageQuery } from '../store/lessons.actions';
import { selectLessonsPage } from '../store/lessons/lessons.selectors';
import { LessonsPageRequested } from '../store/lessons/lessons.actions';


export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private store$: Store<AppState>
    ) {

    }

    loadLessons(courseId: number, page: PageQuery) {
        this.store$
            .pipe(
                select(selectLessonsPage(courseId, page)),
                tap((lessons: Lesson[]) => {
                    (lessons.length)
                        ? this.lessonsSubject.next(lessons)
                        : this.store$.dispatch(new LessonsPageRequested({ courseId, page }))
                }),
                catchError(() => of([]))
            ).subscribe();
    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        console.log('Connecting data source');
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }
}

