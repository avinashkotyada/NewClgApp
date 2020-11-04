import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private loginService : LoginService, private router : Router) {}


  onLogout(){
    this.loginService.changeloginstatus()
    this.router.navigateByUrl('/login')

}

}
