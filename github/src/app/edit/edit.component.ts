import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  updateForm: FormGroup;
  editId: any;
  submitted = false;
  req: any;
  fullName: any;
  username: any;
  points: any;
  notes: any;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.editId = params.id;
      console.log(this.editId);
    });

    this.http.get('/api/edit/' + this.editId).subscribe((res: any) => {
      this.req = res.data;
      console.log(this.req);
      this.updateForm.setValue({
        fullname: this.req.fullname,
        username: this.req.username,
        points: this.req.points,
        notes: this.req.notes
      });
    });
    this.updateForm = this.fb.group({
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      points: ['', [Validators.required]],
      notes: ['', [Validators.required]]
    });
  }
  get f() { return this.updateForm.controls; }


  onUpdate() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    } else {
    this.http.post('/api/update/' + this.editId, this.updateForm.value).subscribe((response) => {
      console.log(response);
      Swal.fire(
        'Good job!',
        'Data successfully updated!',
        'success'
      );
      this.router.navigateByUrl('crud');
    });
  }
  }
}
