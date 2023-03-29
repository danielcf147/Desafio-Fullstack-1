export interface IContactRequest {
  userId: string;
  contactId: string;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  phoneNumber: number;
  createdAt: Date;
}
