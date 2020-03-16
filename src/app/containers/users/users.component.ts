import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private usersService: UserService) { }

  ngOnInit() {
    //the $suffix means it's still an Observable, we haven't subscribed yet!
    this.users$ = this.usersService.getUsers();
  }
}
