import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoriesList: any;
  paginationData: any;

  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCategories(1);
  }

  getCategories(activePage: number) {
    this.commonService.getCategoriesService(activePage).subscribe({
      next: resp => {
        this.categoriesList = resp.data;
        this.paginationData = this.commonService.createDataForPagination(resp);
      },
      error: error => {
        this.toastr.error(error.message || "Something get wrong!");
      }
    })
  }

  addItem(event: number) {
    if (event !== this.paginationData.activePage) {
      this.getCategories(event);
    }
  }
}
