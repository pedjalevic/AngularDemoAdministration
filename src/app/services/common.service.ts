import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CommonService {
  constructor(
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  getFormValidationErrors(form: any) {
    let fields = '';
    Object.keys(form.controls).forEach((key: any) => {
    const controlErrors: ValidationErrors | null | undefined = form.get(key)?.errors;
    if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          fields = fields +  key + ' ' + keyError + ' </br>';
        });
      }
    });
    this.toastr.error(fields);
  }


  createDataForPagination(dataFromAPi: any) {
    let data = [];
    if (dataFromAPi.last_page > 5) {
      if (dataFromAPi.current_page > 3 && !((dataFromAPi.last_page - dataFromAPi.current_page) <= 2)) {
        data = dataFromAPi.links.slice(dataFromAPi.current_page - 2, dataFromAPi.current_page + 3);
      } else if ((dataFromAPi.last_page - dataFromAPi.current_page) <= 2) {
        data = dataFromAPi.links.slice(dataFromAPi.links.length - 6, dataFromAPi.links.length - 1);
      } else {
        data = dataFromAPi.links.slice(1, 6);
      }
    } else {
      data = dataFromAPi.links.slice(1, dataFromAPi.links.length - 1);
    }

    return {
      "data": data,
      "from": dataFromAPi.from,
      "to": dataFromAPi.to,
      "total": dataFromAPi.total,
      "activePage": dataFromAPi.current_page,
      "nextPageUrl": dataFromAPi.next_page_url,
      "prevPageUrl": dataFromAPi.prev_page_url,
      "lastPage": (dataFromAPi.last_page - dataFromAPi.current_page) > 2 ? dataFromAPi.last_page : null,
      "firstPage": dataFromAPi.current_page > 3 ? 1 : null
    };
  }

  getArticleService(articleId: number): Observable<any> {
    return this.http.get<any>(environment.apiBaseUri + "articles/" + articleId);
  }

  getCategoryService(categoryId: number): Observable<any> {
    return this.http.get<any>(environment.apiBaseUri + "categories/" + categoryId);
  }

  getCommentsService(articleId: number): Observable<any> {
    return this.http.get<any>(environment.apiBaseUri + "articles/" + articleId + "/comments");
  }

  getCategoriesService(activePage: number): Observable<any> {
    return this.http.get<any>(environment.apiBaseUri + "categories?page=" + activePage);
  }

  getArticlesService(activePage: number): Observable<any> {
    return this.http.get<any>(environment.apiBaseUri + "articles?page=" + activePage);
  }

  deleteCategoryService(id: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.delete(
      "http://18.192.182.140/api/categories/" + id + "?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN"
      , { headers }
    );
  }

  deleteArticleService(id: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.delete(
      "http://18.192.182.140/api/articles/" + id + "?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN"
      , { headers }
    );
  }

  saveCategoryService(name: any, description: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(
      "http://18.192.182.140/api/categories?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN",
      JSON.stringify({ name, description})
      , { headers }
    );
  }

  changeCategoryService(id: any, name: any, description: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.put(
      "http://18.192.182.140/api/categories/" + id + "?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN",
      JSON.stringify({ name, description})
      , { headers }
    );
  }

  saveArticleService(title: any, body: any, category_id: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(
      "http://18.192.182.140/api/articles?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN",
      JSON.stringify({ title, body, category_id})
      , { headers }
    );
  }

  changeArticleService(id: any, title: any, body: any, category_id: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.put(
      "http://18.192.182.140/api/articles/" + id + "?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN",
      JSON.stringify({ title, body, category_id})
      , { headers }
    );
  }

}
