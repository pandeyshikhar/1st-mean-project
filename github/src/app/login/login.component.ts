import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  data: any;
  Swal: any;
  // formBuilder: any;
  // http: any;
  // password: string;
  // username: string;


  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    // this.username = 'shikhar';
    // this.password = 'pandey';
  }

  ngOnInit() {
    const useridentify = localStorage.getItem('user');
    if (useridentify === '1') {
    this.router.navigateByUrl('home');
    } else {
    this.router.navigateByUrl('');
    }


    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
      });
      }




  onclick(data) {
    console.log(data);
    this.http.post('/api/loginUser', this.loginForm.value).subscribe((response) => {
      // localStorage.setItem(this.key, 'true');
      // start
      if (response === 'wrongpassword') {
        // alert('Please enter correct password');
        Swal.fire('Wrong Password!', 'Please Enter correct password!', 'error');
        return;
      } else if ( response === 'usernotfound') {
        // alert('User not Found');
        Swal.fire('User Not Found', 'Please Enter Correct Username And Password!', 'error');
        return;
      }
      // end
      localStorage.setItem('user', '1');
      this.router.navigateByUrl('home');
      console.log('response', response);
      console.log('shikhar');
      });

  }

  //   if (this.username === data.username && this.password === data.password) {
  //     localStorage.setItem('user', '1');
  //     this.router.navigateByUrl('home');
  //   } else {
  //     alert('invalid credentials');

  //   }






}
