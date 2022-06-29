import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, OnlyLoggedInUsersGuard } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesComponent } from './articles/articles.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import { SingleArticleComponent } from './single-article/single-article.component';
import { CategoriesComponent } from './categories/categories.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AdminComponent } from './admin/admin.component';
import { AddEditArticleComponent } from './add-edit-article/add-edit-article.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    PaginationComponent,
    SingleArticleComponent,
    CategoriesComponent,
    NavigationComponent,
    AdminComponent,
    AddEditArticleComponent,
    AddEditCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      enableHtml: true
    })
  ],
  providers: [OnlyLoggedInUsersGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
