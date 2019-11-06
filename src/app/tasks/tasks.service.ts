import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Task } from './task';
import { HttpErrorHandler, HandlerError } from './../http-error-handler.service';

@Injectable()
export class TasksService {
    private handlerError: HandlerError

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handlerError = httpErrorHandler.createHandlerError('TasksService')
    }

    getTasks(): Observable<Task[]> {
        return this.http
            .get<Task[]>('api/tasks')
            .pipe(catchError(this.handlerError('getTasks', [])))
    }

    addTask(task: Task): Observable<Task> {
        return this.http
            .post<Task>('api/task', task)
            .pipe(catchError(this.handlerError('addTask', task)))
    }

    deleteTask(id: number): Observable<{}> {
        return this.http
            .delete(`api/task/${id}`)
            .pipe(catchError(this.handlerError('deleteTask')))
    }

    updateTask(task: Task): Observable<Task> {
        return this.http
            .put<Task>(`api/task/${task.id}`, task)
            .pipe(catchError(this.handlerError('updateTask', task)))
    }
}