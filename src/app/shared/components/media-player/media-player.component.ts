import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  listaObservers$: Array<Subscription> = [];
  state:String = 'paused'
  constructor(public multimediaService:MultimediaService) { }

  ngOnInit(): void {

    const observer1$ = this.multimediaService.playerStatus$.subscribe(status => this.state = status);
    this.listaObservers$ = [observer1$];
  }

  ngOnDestroy():void{
    this.listaObservers$.forEach(u => u.unsubscribe());
  }

}
