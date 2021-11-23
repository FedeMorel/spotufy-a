import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: TrackModel[] = [];
  tracksRamdom: TrackModel[] = [];

  listObservers$:Array<Subscription> = [];
  constructor(private tracksService: TrackService) { }

  ngOnInit(): void {
    const observer1$ = this.tracksService.dataTracksTrending$.subscribe(res=>{
      this.tracksTrending = res;
    });

    const observer2$ = this.tracksService.dataTracksRamdom$.subscribe(res=>{
      this.tracksRamdom = res;
    });
    this.listObservers$ = [observer1$, observer2$];
  }

  ngOnDestroy():void{
    this.listObservers$.forEach( u => u.unsubscribe);
  }

}
