import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {

  public categoryForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(512)]),
  });

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.resetForm();

    this.route.paramMap.subscribe( paramMap => {
      const id = paramMap.get('id');
      if (id && +id > 0) {
        this.getCategory(+id);
      }
    });
  }

  resetForm() {
    this.categoryForm.controls.id.setValue(0);
    this.categoryForm.controls.name.setValue('');
    this.categoryForm.controls.description.setValue('');
  }

  getCategory(activePage: number) {
    this.commonService.getCategoryService(activePage).subscribe({
      next: resp => {
        this.setFormValue(resp.data);
      },
      error: error => {
        this.toastr.error(error.message || "Something get wrong!");
      }
    })
  }

  setFormValue(data: any) {
    this.categoryForm.controls.id.setValue(data.id);
    this.categoryForm.controls.name.setValue(data.name);
    this.categoryForm.controls.description.setValue(data.description);
  }

  prepareData() {
    const data = this.categoryForm.value;
    return data;
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      const data = this.prepareData();
      if (data.id > 0) {
        this.commonService.changeCategoryService(data.id, data.name, data.description).subscribe({
          next: resp => {
            this.setFormValue(resp.data);
            this.toastr.success('Successfully saved!');
          },
          error: error => {
            this.toastr.error(error.message || "Something get wrong!");
          }
        })
      } else {
        this.commonService.saveCategoryService(data.name, data.description).subscribe({
          next: resp => {
            this.setFormValue(resp.data);
            this.toastr.success('Successfully saved!');
          },
          error: error => {
            this.toastr.error(error.message || "Something get wrong!");
          }
        })
      }
    } else {
      this.commonService.getFormValidationErrors(this.categoryForm);
    }
  }

}
