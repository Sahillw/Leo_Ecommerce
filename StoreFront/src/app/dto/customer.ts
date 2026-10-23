export class Customer {
  customerId?: number;
  name: string;
  email: string;
  phoneNo: string;

  constructor(name: string, email: string, phoneNo: string) {
    this.name = name;
    this.email = email;
    this.phoneNo = phoneNo;
  }
}
