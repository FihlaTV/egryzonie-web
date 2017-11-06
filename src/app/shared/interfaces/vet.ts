import { Location } from './location';

export interface Vet {
  id?: number;
  title: string;
  address: string;
  city?: string;
  createdAt?: Date;
  googleMapsID?: string;
  location?: Location;
  position?: any;
  accepted?: boolean;
  acceptedBy?: any;
  updatedAt?: Date;
  webisteUrl?: string;
  phone?: string;
  rodents?: boolean;
  recommended?: boolean;
}
