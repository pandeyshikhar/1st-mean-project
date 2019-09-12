import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

declare var $: any;  // Declaring $ as a variable so that we can use it to access jQuery


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  requests: any;
  // page = 2;
  searchbox: any;
  Swal: any;
  pager = {} as any;
  pageOfItems = [];
  name: string;
  nextPage: number;
  from: any;
  to: any;
  searchId = '';
  value: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private ng2: Ng2SearchPipeModule,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    // this.formBuilder.group({
    //   startDate: ['', [Validators.required]],
    //   endDate: ['', [Validators.required]]

    // });

    $(
      // tslint:disable-next-line: only-arrow-functions
      function() {
          $('#startDate').datepicker( {dateFormat : 'yy-mm-dd'});
          $('#endDate').datepicker( {dateFormat : 'yy-mm-dd'});
      }
  );

    this.loadPage(1, this.searchId, this.from, this.to);

  }


//   private loadPage(page) {
//     // get page of items from api
//     this.http.get<any>(`/api/items?page=${page}`).subscribe(x => {
//         this.pager = x.pager;
//         this.pageOfItems = x.pageOfItems;
//     });
// }

loadPage(page, searchId, from, to) {
  if (searchId === '') {
    this.name = localStorage.getItem('name');
    // const myname = this.name;
    this.http.get('/api/items/' + page).subscribe((x: any) => {
    console.log('xxxxxxxxxxxx', x);
    this.pager = x.pager;
    this.pageOfItems = x.pageOfItems;
    console.log('xxxxxxxxxxxx', this.pageOfItems);
    // tslint:disable-next-line: radix
    this.nextPage = parseInt(this.pager.currentPage) + 1;
    console.log(this.pager.currentPage);
    });
  } else {
    this.http.get('/api/dis/' + page + '/' + searchId).subscribe((res: any) => {
      console.log('ooooooooooooooooo', res);
      this.pager = res.pager;
      this.pageOfItems = res.pageOfItems;
      // tslint:disable-next-line: radix
      this.nextPage = parseInt(this.pager.currentPage) + 1;
      });
  }
}

// loadPage(page, searchId, sdate, edate) {
//   console.log('loadPage');
//   if ( sdate === '' || edate === '') {
//     if (searchId === '') {
//       this.name = localStorage.getItem('name');
//       // const myname = this.name;
//       this.http.get('/api/items/' + page).subscribe((x: any) => {
//       this.pager = x.pager;
//       this.pageOfItems = x.pageOfItems;
//       console.log('husd');
//       // tslint:disable-next-line: radix
//       this.nextPage = parseInt(this.pager.currentPage) + 1;
//       console.log(this.pager.currentPage);
//       });
//     } else {
//       this.http.get('/api/dis/' + page + '/' + searchId).subscribe((res: any) => {
//         this.pager = res.pager;
//         this.pageOfItems = res.pageOfItems;
//         // tslint:disable-next-line: radix
//         this.nextPage = parseInt(this.pager.currentPage) + 1;
//         });
//     }
//   } else {
//     if (sdate > edate || sdate === '') {
//       alert('put valid data');
//       this.ngOnInit();
//       } else {
//         this.http.get('/api/dateRange/' + sdate + '/' + edate).subscribe((res: any) => {
//           // console.log('<<<<<<>>>>>>', res.doc);
//           console.log('......', res);
//           // this.pageOfItems = res.doc;
//           this.pageOfItems = res;
//           console.log('helllo there');
//           console.log(this.pageOfItems);
//           this.pager = res.pager;
//           this.pageOfItems = res.pageOfItems;
//           // tslint:disable-next-line: radix
//           this.nextPage = parseInt(this.pager.currentPage) + 1;

//             });
//       }
//   }


//   }


  show(searchId) {
    // this.name = localStorage.getItem('name');
    // const myname = this.name;
    if (searchId === '') {
       const page = 1;
       this.http.get('/api/items/' + page).subscribe((x: any) => {
        this.pager = x.pager;
        this.pageOfItems = x.pageOfItems;
        console.log('husd');
        // tslint:disable-next-line: radix
        this.nextPage = parseInt(this.pager.currentPage) + 1;
        console.log(this.pager.currentPage);
        });

    } else {
      this.http.get('/api/display/' + searchId).subscribe((res: any) => {


        // tslint:disable-next-line: no-conditional-assignment
        // let a = 1;
        // let b = 3;
        if (res === 'noDataFound') {
          Swal.fire('No Data Found!', 'The Data You are trying to search is not present', 'warning');
          // alert('No Data Found');
          console.log('noDataFound');
          const val = '';
          // this.ngOnInit();
          // this.router.navigateByUrl('home');
          this.pager = res.pager;
          this.pageOfItems = res.pageOfItems;
          // tslint:disable-next-line: radix
          this.nextPage = parseInt(this.pager.currentPage) + 1;
        } else {
          this.pager = res.pager;
          this.pageOfItems = res.pageOfItems;
          // tslint:disable-next-line: radix
          this.nextPage = parseInt(this.pager.currentPage) + 1;
        }
        });

    }

    }

   edit(id) {
    // this.router.navigate([`/edit/${id}`]);
    this.router.navigateByUrl('/edit/' + id);
    localStorage.setItem('userID', id);

            //  this.router.navigateByUrl('/edit/' + id);

    // console.log(id);
    // this.http.post('/api/edit/' + id, '').subscribe((res: any) => {

    //  });
  }

  delete(id) {
    console.log(id);
    this.http.post('/api/delUser/' + id, '').subscribe((res: any) => {
        this.ngOnInit();
    });
  }


  date(sdate, edate) {
    if ( sdate === '' || edate === '' ) {
      const page = 1;
      this.http.get('/api/items/' + page).subscribe((x: any) => {
       this.pager = x.pager;
       this.pageOfItems = x.pageOfItems;
       console.log('husd');
       // tslint:disable-next-line: radix
       this.nextPage = parseInt(this.pager.currentPage) + 1;
       console.log(this.pager.currentPage);
       });
    } else {
    // tslint:disable-next-line: no-unused-expression
    // this.from = $('#startDate').val();
    // // tslint:disable-next-line: no-unused-expression
    // this.to = $('#endDate').val();

    this.from = sdate = $('#startDate').val();
    this.to = edate = $('#endDate').val();

    console.log('start', this.from);
    console.log('end', this.to);

    if (this.from > this.to || this.from === '') {
   alert('put valid data');
   this.ngOnInit();
   } else {
    // alert('success');
    // this.http.get('/api/dateRange/'+from+'/'+to+'/'+_userid)

    this.http.get('/api/datePickerRange/' + this.from + '/' + this.to).subscribe((res: any) => {
    console.log('<<<<<<>>>>>>', res);

    if (res === 'Empty') {
      // Swal.fire('No Data Found!', 'The Data You are trying to search is not present', 'warning');

      Swal.fire({
        title: 'No Data Found!',
        text: 'The Data You are trying to search is not present',
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'okay'
      }).then((result) => {
        if (result.value) {
          // Swal.fire(
          //   'Deleted!',
          //   'Your file has been deleted.',
          //   'success'
          // );
          // this.ngOnInit();
          // this.router.navigateByUrl('crud');
          this.pager = res.pager;
          this.pageOfItems = res.pageOfItems;
          // tslint:disable-next-line: radix
          this.nextPage = parseInt(this.pager.currentPage) + 1;


        }
      });
      // alert('No Data Found');
      this.router.navigateByUrl('crud');
      console.log('sahi nahi hai');
      // this.ngOnInit();
      this.pager = res.pager;
      this.pageOfItems = res.pageOfItems;
      // tslint:disable-next-line: radix
      this.nextPage = parseInt(this.pager.currentPage) + 1;
    } else {
      console.log('sahi hai');
      this.pager = res.pager;
      this.pageOfItems = res.pageOfItems;
      // tslint:disable-next-line: radix
      this.nextPage = parseInt(this.pager.currentPage) + 1;
    }

    // console.log('......', res);
    // // this.pageOfItems = res.doc;
    // this.pageOfItems = res;
    // console.log('helllo there');
    // console.log(this.pageOfItems);
    // this.pager = res.pager;
    // this.pageOfItems = res.pageOfItems;
    // // tslint:disable-next-line: radix
    // this.nextPage = parseInt(this.pager.currentPage) + 1;

      });
   }

  }}
}
