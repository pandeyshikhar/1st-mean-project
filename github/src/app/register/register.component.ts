import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { MustMatch } from '../must-match';
// github/src/app/must-match.ts


declare var M: any;

@Component({
  selector: 'app-add-new',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 userForm: FormGroup;
 submitted = false;
  // http: any;
  // router: any;

 constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

 ngOnInit() {
  this.userForm = this.formBuilder.group({
    fullname: ['', [Validators.required]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    city: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmpassword: ['', [Validators.required]],
    country: ['', [Validators.required]],
    username: ['', [Validators.required]],
    }, {
     validator: MustMatch('password', 'confirmpassword')
   });
    }


 // convenience getter for easy access to form fields
 get f() { return this.userForm.controls; }

 onSubmit() {
  this.submitted = true;
  if (this.userForm.valid) {

 this.http.post('/api/userCreate', this.userForm.value).subscribe((response) => {
  localStorage.setItem('user', '1');
  this.router.navigateByUrl('home');
  console.log('response', response);
  M.toast({ html: 'Saved Successfully', classes: 'rounded'});

});
 } else {
//  alert('user from is not valid');
//  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userForm.value));
return;
 }
 }
// onSubmit() {
//   this.submitted = true;
//   if (this.userForm.invalid) {
//   return;
//   }
//   this.http.post('/api/userCreate', this.userForm.value).subscribe((response) => {
//     console.log('response', response);
//     this.router.navigateByUrl('');
//   });

//   }

}
