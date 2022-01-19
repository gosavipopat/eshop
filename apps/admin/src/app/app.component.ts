import { Component, OnInit } from '@angular/core';
import { UsersService } from '@myapp/users';

@Component({
    selector: 'admin-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
    title = 'admin';

    constructor(private userService: UsersService){}

    ngOnInit(): void {
      this.userService.initAppSession();
    }
}
