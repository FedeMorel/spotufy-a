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

  constructor(private tracksService: TrackService) { }

  ngOnInit(): void {
    this.loadDataAllTracks();
    this.loadDataRamdomTracks();

  }

  loadDataAllTracks():void{
    this.tracksService.getAllTracks$().subscribe((res:TrackModel[]) =>{
      this.tracksTrending = res;
    });
  }

  loadDataRamdomTracks():void{
    this.tracksService.getAllRamdom$().subscribe((res:TrackModel[]) =>{
      this.tracksRamdom = res;
    });
  }


  ngOnDestroy():void{
    
  }

}