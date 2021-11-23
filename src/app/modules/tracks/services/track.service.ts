import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import * as dataRaw from '../../../data/tracks.json'
@Injectable({
  providedIn: 'root'
})
export class TrackService {
  dataTracksTrending$ : Observable<TrackModel[]> = of([]);
  dataTracksRamdom$ : Observable<TrackModel[]> = of([]);

  constructor() {
    const {data}: any = (dataRaw as any).default;
    this.dataTracksTrending$ = of (data);

    this.dataTracksRamdom$ = new Observable((observer) =>{
      const tracksExample: TrackModel = {
        _id:9,
        name: 'Leve',
        album: 'Cartel de Santa',
        url: 'http://',
        cover: 'https://i.scdn.co/image/ab6761610000e5ebbd172041a059e4b6e46e2cfc',
        duration: 1
      }
      observer.next([tracksExample])
    })
  }
}
