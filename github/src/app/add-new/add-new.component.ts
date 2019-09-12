import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';


declare var $: any;  // Declaring $ as a variable so that we can use it to access jQuery


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  newUser: FormGroup;
 submitted = false;
  selectedFile = null;
  // http: any;
  // router: any;

 constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private httpc: HttpClientModule) { }

 ngOnInit() {
  this.newUser = this.formBuilder.group({
    fullname: ['', [Validators.required]],
    username: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    points: ['', [Validators.required]],
    notes: ['', [Validators.required]],
    images: ['', [Validators.required]]
    });



  $(
      // tslint:disable-next-line: only-arrow-functions
      function() {
          $('#dob').datepicker( {dateFormat : 'yy-mm-dd'});
      }
  );
    }


 // convenience getter for easy access to form fields
 get f() { return this.newUser.controls; }


 submit() {
  this.submitted = true;
  // console.log('IMSIDE SUBMIT');
  if (this.newUser.valid) {
    this.newUser.value.images = this.selectedFile;
    const reader =  new FileReader();
    reader.readAsDataURL(this.selectedFile);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
    this.newUser.value.images = reader.result;
    console.log('img', this.newUser.value.images);
    this.http.post('/api/newUser', this.newUser.value).subscribe((response) => {
    //  localStorage.setItem('user', '1');
    console.log(this.newUser.value);
    this.router.navigateByUrl('crud');
    console.log('response', response);
    console.log('Image', this.newUser.value.images);

   });
    };


    // const fd = new FormData();
    // fd.append('images', this.selectedFile, this.selectedFile.name );
    // console.log('fd', fd);
    // this.newUser.value.images = fd;


    } else {
    // alert('user from is not valid');
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userForm.value));
   return;
    }
    }


//  onSubmit() {
//   this.submitted = true;
//   if (this.newUser.valid) {

//  this.http.post('/api/userCreate', this.newUser.value).subscribe((response) => {
//   localStorage.setItem('user', '1');
//   this.router.navigateByUrl('home');
//   console.log('response', response);

// });
//  } else {
// //  alert('user from is not valid');
// //  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userForm.value));
// return;
//  }
//  }
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


onImageUpload(event) {
  console.log(event);
  this.selectedFile = event.target.files[0];
  console.log('Hello', this.selectedFile );
}
}
