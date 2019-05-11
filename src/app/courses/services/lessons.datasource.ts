import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, empty, Subject } from 'rxjs';
import { catchError, tap, finalize, take, takeUntil } from 'rxjs/operators';

import { AppState } from '../../store/reducers';
import { Lesson } from '../model/lesson';
import { LessonsPageRequested, PageQuery } from '../store/lessons/lessons.actions';
import { selectLessonsPage } from '../store/lessons/lessons.selectors';


export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private end = new Subject<any>();
    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private store$: Store<AppState>
    ) { }

    loadLessons(courseId: number, page: PageQuery) {
        this.store$
            .pipe(
                select(selectLessonsPage(courseId, page)),
                tap(() => console.log('hello from LessonsDataSource... ')),
                tap((lessons: Lesson[]) => {
                    (lessons.length)
                        ? (this.lessonsSubject.next(lessons), this.end.next())
                        : this.store$.dispatch(new LessonsPageRequested({ courseId, page }));
                }),
                takeUntil(this.end),
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

