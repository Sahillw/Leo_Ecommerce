import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchaseorder } from '../dto/purchaseorder';
import { AppConstants } from '../constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private httpClient: HttpClient) {}

  placeOrder(purchase: Purchaseorder): Observable<any> {
    return this.httpClient.post<Purchaseorder>(
      AppConstants.ORDER_ENDPOINT,
      purchase,
    );
  }
}
