import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  mockCover: TrackModel = {
    cover: ' ',
    album: ' ',
    name: ' ',
    url: ' ',
    duration: 1.2,
    _id: 1
  }

  listObservers$: Array<Subscription> = [];

  constructor(private multimediaService:MultimediaService) { }

  ngOnInit(): void {
    const observer1$:Subscription = this.multimediaService.callback.subscribe((res:TrackModel) =>{

    });
    this.listObservers$ = [observer1$]
  }

  ngOnDestroy():void{
    this.listObservers$.forEach(u => u.unsubscribe());
  }

}
