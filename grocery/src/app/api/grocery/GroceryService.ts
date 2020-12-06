import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {


  /* Defining the Data set*/
  Items = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log('Connecting Grocery Service Provider');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  private extractData(res: Response) {
    console.log(`Response is ::${res}`);
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error;
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return throwError(errMsg);
  }
  // To get the list of Items
  getItems(): Observable<object[]> {
    return <Observable<object[]>>this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData), catchError(this.handleError)
    );
  }
  // To Remove an Item from an Array
  removeItem(item) {
    let destination:string;
    destination = this.baseURL+'/api/groceries/'+item._id;
    console.log(destination);
    this.http.delete(destination,item).subscribe(
      res => {
        this.Items = <any> res;
        this.dataChangeSubject.next(true);
      });
  }

  // To Add an Item from an Array
  addItem(item) {
    console.log('Adding item::' + item);
    this.http.post(this.baseURL + '/api/groceries', item).subscribe(
      res => {
        this.Items = <any> res;
        this.dataChangeSubject.next(true);
      });
  }

  // To Edit an Item from an Array
  editItem(item) {
    let destination : string;
    console.log('Editing item::' + item._id);
    destination = this.baseURL+'/api/groceries/'+item._id;
    console.log(destination);
    this.http.put(destination,item).subscribe(
      res => {
        this.Items = <any> res;
        this.dataChangeSubject.next(true);
      }
    );
  }
}
