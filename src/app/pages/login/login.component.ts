import { Component, OnInit } from '@angular/core';
import loginForm from "./login.form";
import {Form} from "../../mms-common/models/form";

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
