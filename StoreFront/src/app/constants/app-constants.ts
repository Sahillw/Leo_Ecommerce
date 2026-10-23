export class AppConstants {
  static PRODUCT_API = 'http://localhost:8080';
  static CATEGORY_ENDPOINT = `${AppConstants.PRODUCT_API}/categories`;
  static PRODUCTS_SEARCH_ENDPOINT = `${AppConstants.PRODUCT_API}/products/search`;

  public static ORDER_ENDPOINT = 'http://localhost:8081/order'; // Adjust port/URL if needed
}
