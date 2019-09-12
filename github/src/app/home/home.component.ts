import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private location: LocationStrategy) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
    history.pushState(null, null, window.location.href);
    });
    }

  ngOnInit() {
    const useridentify = localStorage.getItem('user');
    if (useridentify === '1') {
    this.router.navigateByUrl('home');
    } else {
    this.router.navigateByUrl('');
    }
    }

}
