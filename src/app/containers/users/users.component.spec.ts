// import { UsersComponent } from './users.component';
// import { of } from 'rxjs/observable/of';
// import { timer } from 'rxjs/observable/timer';
// import { UserService } from '../../services/user.service';
// import { mapTo } from 'rxjs/operators';


// describe('Users Component', () => {
//   let component: UsersComponent;

//   const fakeUser = { id: 1, name: 'fake' }

//   // const fakeUserService = {
//   //   //getUsers needs to pass back an observable
//   //   getUsers: () => of([fakeUser]),
//   //   httpClient: {}
//   // } as any;
//   // UsersComponent expects a 
//   //UserService, but the 'as any' above forces it not to care!

//   // const fakeUserService = jasmine.createSpyObj('userService', ['getUsers'])
//   const userService = new UserService(null)

//   beforeEach(() => {
//     component = new UsersComponent(userService)
//   });

//   it('should have a component', () => {
//     expect(component).toBeTruthy()
//   });

//   it('should have a list of users', () => {
//     //here we're getting a hold of the spy and returning a value from it
//     // const spy = fakeUserService.getUsers.and.returnValue(of([fakeUser]))
//     const spy = spyOn(userService, 'getUsers').and.returnValue(of([fakeUser]))
//     //calls the OnInit method defined in UsersComponent
//     //which calls getUsers() from our fake user service & defines users$
//     //getUsers() has a spy that returns fakeUser
//     component.ngOnInit();

//     component.users$.subscribe(users => {
//       console.log("here are the users", users) //wallaby would place this inline
//       expect(users).toEqual([fakeUser]);
//       expect(spy).toHaveBeenCalled()

//     })
//   });

//   it('should have a list of users', (done) => {
//     //const spy = spyOn(userService, 'getUsers').and.returnValue(of([fakeUser]))
//     const spy = spyOn(userService, 'getUsers').and.returnValue(timer(1000).pipe(mapTo([fakeUser])))

//     component.ngOnInit();

//     component.users$.subscribe(users => {
//       console.log("here are the delayed users", users) //wallaby would place this inline
//       expect(users).toEqual([fakeUser]);
//       done()
//     })
//   });
// });




// import { UsersComponent } from './users.component';
// import { of } from 'rxjs/observable/of';
// import { timer } from 'rxjs/observable/timer';
// import { UserService } from '../../services/user.service';
// import { mapTo } from 'rxjs/operators';

// describe(`Users Component`, () => {
//     let component: UsersComponent;
//     const fakeUser = {id: 1, name: 'fake'};
//     // const fakeUserService = {
//     //     getUsers: () => of([fakeUser]),
//     //     httpClient: {}
//     // } as any;

//     // const fakeUserService = jasmine.createSpyObj('userService', ['getUsers']);
//     const userService = new UserService(null);
//     beforeEach(() => {
//         component = new UsersComponent(userService);
//     });

//     it(`should have a component`, () => {
//         expect(component).toBeTruthy();
//     });

//     it(`should have a list of users`, () => {
//         const spy = spyOn(userService, 'getUsers').and.returnValue(of([fakeUser]));
//         component.ngOnInit();
//         component.users$.subscribe(users => {
//             console.log(users);
//             expect(users).toEqual([fakeUser]);
//             expect(spy).toHaveBeenCalled();
//             expect(spy).toHaveBeenCalledWith();
//             expect(spy).toHaveBeenCalledTimes(1);
//         });
//     });

//     it(`should have a list of users`, (done) => {
//         // const spy = spyOn(userService, 'getUsers').and.returnValue(of([fakeUser]));
//         const spy = spyOn(userService, 'getUsers').and.returnValue(timer(1000).pipe(mapTo([fakeUser])));
//         component.ngOnInit();
//         component.users$.subscribe(users => {
//             console.log(users);
//             expect(users).toEqual([fakeUser]);
//             done();
//         });
//     });
// });


















import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';
import { mapTo } from 'rxjs/operators';
import { async, ComponentFixture, TestBed, fakeAsync, discardPeriodicTasks, tick } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: UserService;
  const fakeUser = { id: 1, name: 'fake' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({ //TestBed is really just an Angular module
      imports: [RouterTestingModule],
      declarations: [UsersComponent, UserListComponent],
      providers: [
        UserService,
        //if they ask for HttpClient, give {}
        { provide: HttpClient, useValue: {} }],
      // schemas: [NO_ERRORS_SCHEMA] //says: ignore child component directives in the template
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;//generates classv instance frm fixture
    userService = TestBed.get(UserService);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a list of users`, (done) => {
    // const spy = spyOn(userService, 'getUsers').and.returnValue(of([fakeUser]));
    const spy = spyOn(userService, 'getUsers').and.returnValue(timer(1000).pipe(mapTo([fakeUser])));
    component.ngOnInit();
    component.users$.subscribe(users => {
      console.log(users);
      expect(users).toEqual([fakeUser]);
      done();
    });
  });

  // it(`should have a list of users`, async(() => {

  //   const spy = spyOn(userService, 'getUsers').and.returnValue(timer(1000).pipe(mapTo([fakeUser])));
  //   component.ngOnInit();
  //   component.users$.subscribe(users => {
  //     // console.log(users);
  //     console.log(document.querySelector('app-user-list').innerHTML)
  //     expect(users).toEqual([fakeUser]);
      
  //   });
  //   // discardPeriodicTasks() //gets rid of error about timer still being in queue
  //   // tick(1000)
  //   fixture.whenStable().then(() => { //returns a PROMISE
  //     fixture.detectChanges();
  //     const buttons = fixture.debugElement.queryAll(By.css('.user-button'));
  //     expect(buttons[0].nativeElement.textContent).toEqual('fake');
  //   })
  // }
  // )
  // );

  it(`should have a list of users`, async(() => {
    // const spy = spyOn(userService, 'getUsers').and.returnValue(of([fakeUser]));
    const spy = spyOn(userService, 'getUsers').and.returnValue(timer(1000).pipe(mapTo([fakeUser])));
    component.ngOnInit();
    fixture.detectChanges();
    component.users$.subscribe(users => {
      // console.log(users);
      // console.log(document.querySelector('app-user-list').innerHTML);
      expect(users).toEqual([fakeUser]);
    });

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('.user-button'));
      expect(buttons[0].nativeElement.textContent).toEqual('fake');
    });

  }));
});
