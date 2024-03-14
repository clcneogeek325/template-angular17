import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

type Grade = 'A'|'B'|'C';

@Component({
  standalone: true,
  imports: [CommonModule,TitleComponent],
  templateUrl: './control-flow.component.html',
  styles: ``
})


export default class ControlFlowComponent {

  public showContent = signal(false);
  public grade = signal<Grade>('A');
  public frameworks = signal(["angular","React","Vue"]);

  public toggleContent(){
    this.showContent.update(value => !value);

    this.grade.set('B');
  }


}
