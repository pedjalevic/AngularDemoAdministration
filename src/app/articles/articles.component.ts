import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articlesList: any;
  paginationData: any;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getArticles(1);
  }

  getArticles(activePage: number) {
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

  openArcticle(id: number) {
    this.router.navigate(['articles/' + id ]);
  }

  addItem(event: number) {
    if (event !== this.paginationData.activePage) {
      this.getArticles(event);
    }
  }
}
