import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  articlesList: any;
  paginationData: any;

  categoriesList: any;
  paginationDataCat: any;

  activePageArticle = 1;
  activePageCategory = 1;


  articleModal = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getArticles(this.activePageArticle);
    this.getCategories(this.activePageCategory);
  }

  getArticles(activePage: number) {
    this.activePageArticle = activePage;
    this.commonService.getArticlesService(activePage).subscribe({
      next: resp => {
        this.articlesList = resp.data;
        this.paginationData = this.commonService.createDataForPagination(resp);
      },
      error: error => {
        this.toastr.error(error.message || "Something get wrong!");
      }
    })
  }

  addItem(event: number) {
    if (event !== this.paginationData.activePage) {
      this.getArticles(event);
    }
  }

  getCategories(activePage: number) {
    this.activePageCategory = activePage;
    this.commonService.getCategoriesService(activePage).subscribe({
      next: resp => {
        this.categoriesList = resp.data;
        this.paginationDataCat = this.commonService.createDataForPagination(resp);
      },
      error: error => {
        this.toastr.error(error.message || "Something get wrong!");
      }
    })
  }

  addItemCat(event: number) {
    if (event !== this.paginationDataCat.activePage) {
      this.getCategories(event);
    }
  }

  openArticle(id: number) {
    this.router.navigate(['admin/article/' + id]);
  }

  openCategory(id: number) {
    this.router.navigate(['admin/category/' + id]);
  }

  deleteArticle(id: number) {
    this.commonService.deleteArticleService(id).subscribe({
      next: resp => {
        this.toastr.success('Successfully deleted!');
        if (this.articlesList.length > 1) {
          this.getArticles(this.activePageArticle);
        } else {
          this.activePageArticle = this.activePageArticle - 1;
          this.getArticles(this.activePageArticle);
        }
      },
      error: error => {
        this.toastr.error(error.message || "Something get wrong!");
      }
    })
  }

  deleteCategory(id: number) {
    this.commonService.deleteCategoryService(id).subscribe({
      next: resp => {
        this.toastr.success('Successfully deleted!');
        if (this.categoriesList.length > 1) {
          this.getCategories(this.activePageCategory);
        } else {
          this.activePageCategory = this.activePageCategory - 1;
          this.getCategories(this.activePageCategory);
        }
      },
      error: error => {
        this.toastr.error(error.message || "Something get wrong!");
      }
    })
  }

}
