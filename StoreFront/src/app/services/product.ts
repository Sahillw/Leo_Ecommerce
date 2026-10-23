import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';
import { AppConstants } from '../constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<ApiResponse<ProductCategory[]>> {
    return this.http.get<ApiResponse<ProductCategory[]>>(
      `${AppConstants.PRODUCT_API}/categories`,
    );
  }

  getProductsByCategoryId(
    categoryId: number,
  ): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(
      `${AppConstants.PRODUCT_API}/products/${categoryId}`,
    );
  }

  searchProducts(theKeyword: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(
      `${AppConstants.PRODUCT_API}/products/search/${theKeyword}`,
    );
  }
}
