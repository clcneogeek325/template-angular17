import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@interfaces/req-response';
import { TitleComponent } from '@shared/title/title.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsersService } from '@services/users.service';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [TitleComponent,CommonModule],
  template: `
  <app-title [title]="titleLabel()" />
  @if ( user() ) {
      <section>
        <img 
          [srcset]="user()!.avatar"
          [alt]="user()!.last_name"
        />

        <h3>First name:: {{user()!.first_name}}</h3>
        <h3>Last name:: {{user()!.last_name}}</h3>
        <h3>Email:: {{user()!.email}}</h3>
      </section>
  } @else {
    <p>Cargando datos....</p>
  }


  `
})
export default class UserComponent {
  private route = inject(ActivatedRoute);

  private usersService = inject( UsersService);

  //public user = signal<User|undefined>(undefined);

  public titleLabel = computed( () => {
    if(this.user()){
      return  `Informacion del usuario ${ this.user()?.first_name } ${ this.user()?.last_name } `;
    }

    return 'Informacion del usuario.';
  });

  public user = toSignal(
    this.route.params.pipe(
      switchMap( ({ id }) => this.usersService.getUserById( id ))
    )
  );

constructor(){
  console.log(this.route.params);
}

}
