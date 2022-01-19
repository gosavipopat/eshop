import { Component, OnInit } from '@angular/core';
import { UsersService } from '@myapp/users';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'ngshop';

  constructor(private userService: UsersService){}

  ngOnInit(): void {
      this.userService.initAppSession();
  }

}
