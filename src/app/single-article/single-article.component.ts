import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss']
})
export class SingleArticleComponent implements OnInit {

  articleData: any;
  categoryData: any;
  commentsData: any;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id && +id > 0) {
        this.getArticles(+id);
        this.getComments(+id);
      }
    });
  }


  getArticles(articleId: number) {
    this.commonService.getArticleService(articleId).subscribe({
      next: resp => {
        this.articleData = resp.data;
        this.getCategory(resp.data.category_id);
      },
      error: error => {
        this.toastr.error(error.message || "Something get wrong!");
      }
    })
  }

  getComments(articleId: number) {
    this.commonService.getCommentsService(articleId).subscribe({
      next: resp => {
        this.commentsData = resp.data;
      },
      error: error => {
        this.toastr.error(error.message || "Something get wrong!");
      }
    })
  }


  getCategory(categoryId: number) {
    this.commonService.getCategoryService(categoryId).subscribe({
      next: resp => {
        this.categoryData = resp.data;
      },
      error: error => {
        this.toastr.error(error.message || "Something get wrong!");
      }
    })
  }

}
