import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    let useridentify = localStorage.getItem('user');
    if(useridentify==='1')
    {
    this.router.navigateByUrl('map');
    }
    else{
    this.router.navigateByUrl('');
    }
    }

}
