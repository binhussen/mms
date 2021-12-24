import { Component, OnInit } from '@angular/core';
import loginForm from "./login.form";
import {Form} from "../../mms-common/models/form";
import {transition, trigger, useAnimation} from "@angular/animations";
import {fadeIn} from "ng-animate";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 1000, delay: 2000 }
    }))])
  ]
})
export class LoginComponent implements OnInit {
  form!: Form;
  constructor() { }

  ngOnInit(): void {
    this.form = loginForm;
  }

}
