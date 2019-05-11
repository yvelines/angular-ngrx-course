import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Lesson } from '../model/lesson';
import { CoursesService } from './courses.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { PageQuery } from '../store/lessons.actions';






export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private store$: Store<AppState>
    ) {

    }

    loadLessons(courseId: number, pageQuery: PageQuery) {
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

