export class Address {
  addrId?: number;
  hno: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  addrType: string;

  constructor(
    street: string,
    city: string,
    state: string,
    zipCode: string,
    hno: string = '',
  ) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.hno = hno;
    this.addrType = 'HOME';
  }
}
