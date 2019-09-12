import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.css']
})
export class FormLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const useridentify = localStorage.getItem('user');
    if (useridentify === '1') {
    this.router.navigateByUrl('form');
    } else {
    this.router.navigateByUrl('');
    }
    }

}
