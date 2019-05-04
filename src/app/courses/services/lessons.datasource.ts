import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

import { Lesson } from '../model/lesson';






export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    constructor() {

    }

    loadLessons() {

    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        console.log('Connecting data source');
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
    }

}

