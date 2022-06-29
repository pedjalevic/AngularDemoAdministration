import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from './../services/common.service';

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.scss']
})
export class AddEditArticleComponent implements OnInit {

  public articleForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    body: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    categoryId: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  categoriesList: any = [];

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.resetForm();

    this.getCategories(1);

    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id && +id > 0) {
        this.getArticles(+id);
      }
    });
  }


  resetForm() {
    this.articleForm.controls.id.setValue(0);
    this.articleForm.controls.title.setValue('');
    this.articleForm.controls.body.setValue('');
    this.articleForm.controls.categoryId.setValue('');
  }

  getArticles(activePage: number) {
    this.commonService.getArticleService(activePage).subscribe({
      next: resp => {
        this.setFormValue(resp.data);
      },
      error: error => {
        this.toastr.error(error.message || "Something get wrong!");
      }
    })
  }

  setFormValue(data: any) {
    this.articleForm.controls.id.setValue(data.id);
    this.articleForm.controls.title.setValue(data.title);
    this.articleForm.controls.body.setValue(data.body);
    this.articleForm.controls.categoryId.setValue(data.category_id);
  }

  getCategories(activePage: number) {
    this.commonService.getCategoriesService(activePage).subscribe({
      next: resp => {
        this.categoriesList.push.apply(this.categoriesList, resp.data);
        if (resp.next_page_url) {
          this.getCategories(activePage + 1);
        }
      },
      error: error => {
        this.toastr.error(error.message || "Something get wrong!");
      }
    })
  }

  prepareData() {
    const data = this.articleForm.value;
    return data;
  }

  saveArticle() {
    if (this.articleForm.valid) {
      const data = this.prepareData();
      if (data.id > 0) {
        this.commonService.changeArticleService(data.id, data.title, data.body, data.categoryId).subscribe({
          next: resp => {
            this.setFormValue(resp.data);
            this.toastr.success('Successfully saved!');
          },
          error: error => {
            this.toastr.error(error.message || "Something get wrong!");
          }
        })
      } else {
        this.commonService.saveArticleService(data.title, data.body, data.categoryId).subscribe({
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
      this.commonService.getFormValidationErrors(this.articleForm);
    }
  }

}
