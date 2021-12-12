import { Component, OnInit } from '@angular/core';
import {Form} from "../../mms-common/organisms/form/form.component";
import loginForm from "./login.form";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: Form;
  constructor() { }

  ngOnInit(): void {
    this.form = loginForm;
  }

}
