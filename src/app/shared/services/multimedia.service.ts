import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!:HTMLAudioElement;
  public timeElapser$:BehaviorSubject<string> = new  BehaviorSubject('00:00');
  public timeRemainig$:BehaviorSubject<string> = new  BehaviorSubject('-00:00');
  public playerStatus$:BehaviorSubject<string> = new  BehaviorSubject('paused');
  public playerPercentage$:BehaviorSubject<number> = new  BehaviorSubject(0);

  constructor() {
    this.audio = new Audio();

    this.trackInfo$.subscribe(responseOK =>{
      if(responseOK){
        this.serAudio(responseOK)
      }
    });
    this.listenAllEvents();
  }

  private listenAllEvents():void{
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerSatus, false);
    this.audio.addEventListener('play', this.setPlayerSatus, false);
    this.audio.addEventListener('pause', this.setPlayerSatus, false);
    this.audio.addEventListener('ended', this.setPlayerSatus, false);
    

  }

  private setPlayerSatus = (state: any) =>{

    switch(state.type){
      case 'play':
          this.playerStatus$.next('play');
        break;
      case 'playing':
        this.playerStatus$.next('playing');
      break;
      case 'ended':
          this.playerStatus$.next('ended');
        break;
      default:
        this.playerStatus$.next('paused');
        break; 
    }
  }

  private calculateTime = () =>{
    const {duration, currentTime} = this.audio;
    this.setTimeElapsed(currentTime);
    this.setReaminig(currentTime, duration);
    this.setPercentage(currentTime,duration);
  }

  private setPercentage(currentTime: number, duration:number): void{
    const percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }

  private setTimeElapsed(currentTime: number): void{
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60);

    const displaySeconds = (seconds < 10 ) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10 ) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeElapser$.next(displayFormat);
  }

  private setReaminig(currentTime: number, duration:number):void{
    let timeLeft = duration - currentTime;

    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);
    const displaySeconds = (seconds < 10 ) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10 ) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`;
    this.timeRemainig$.next(displayFormat);

  }

  public serAudio(track:TrackModel): void{
    this.audio.src = track.url;
    this.audio.play();
  }

  public togglePlayer(): void{
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }
}
