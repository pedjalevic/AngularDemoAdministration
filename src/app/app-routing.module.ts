import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditArticleComponent } from './add-edit-article/add-edit-article.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { AdminComponent } from './admin/admin.component';
import { OnlyLoggedInUsersGuard } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { CategoriesComponent } from './categories/categories.component';
import { SingleArticleComponent } from './single-article/single-article.component';

const routes: Routes = [
  { path: '', component: ArticlesComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'articles/:id', component:  SingleArticleComponent},
  { path: 'admin', component: AdminComponent, canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'admin/article/:id', component:  AddEditArticleComponent},
  { path: 'admin/category/:id', component:  AddEditCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
