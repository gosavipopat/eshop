import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { LocalstorageService } from './../services/localstorage.service';
import { concatMap, of, map, catchError } from 'rxjs';
//import { UsersService } from '@myapp/users';
import { UsersService } from '../services/users.service';

import * as UsersActions from './users.actions';
//import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {

  buildUserSession = createEffect(()=> this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(()=>{
      if(this.localstorageService.isValidtoken()){
        const userId = this.localstorageService.getUserIdFromToken();
        if(userId){
          return this.usersService.getUser(userId).pipe(
            map(user => {
              return UsersActions.buildUserSessionSuccess({user : user})
            }),
            catchError(()=> of(UsersActions.buildUserSessionFailed()))
          )
        } else {
          return of(UsersActions.buildUserSessionFailed())
        }
      } else {
        return of(UsersActions.buildUserSessionFailed())
      }
    })
  ))

  constructor(
    private readonly actions$: Actions,
    private localstorageService: LocalstorageService,
    private usersService: UsersService) {}
}
