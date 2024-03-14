import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  standalone: true,
  imports: [CommonModule,TitleComponent],
  //changeDetection:ChangeDetectionStrategy.Default,
  template: `
  <app-title title="Change detection"/>

  <pre>{{ frameworkSignal() | json }}</pre>

  <pre>{{ frameworkProperty | json}}</pre>
  `
})
export default class ChangeDetectionComponent {

  public frameworkSignal = signal({
    name:"Angular Signal",
    releaseDate:"2024"
  });


  public frameworkProperty = {
    name:"Angular Property",
    releaseDate:"2023"
  };

  constructor(){
    setTimeout(() => {
      //this.frameworkProperty.name  = "Vue";
      this.frameworkSignal.update( value => {
        value.name = "Vue";
        return value;
      }

      );
      console.log(this.frameworkSignal());
    }, 3000);

    //console.log(this.frameworkProperty);
      

  }

}
