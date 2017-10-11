export interface Vet {
  id?: number;
  title: string;
  address: string;
  city: string;
  createdAt?: Date;
  googleMapsID?: string;
  accepted?: boolean;
  acceptedBy?: any;
  updatedAt?: Date;
  webisteUrl?: string;
  phone?: string;
  rodents?: boolean;
  recommended?: boolean;
}
