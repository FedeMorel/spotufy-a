import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly URL = environment.api;
  constructor(private httpClient: HttpClient) {
  
  
  }

  getAllTracks$():Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      map(({data}:any) =>{
        return data
      }),
      catchError((err) =>{
        console.log('algo pasó');
        return of([])
      })
    )
  }

  getAllRamdom$():Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      map(({data}:any) =>{
        return data.reverse();
      })
    )
  }
}
