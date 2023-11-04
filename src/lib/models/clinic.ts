export class Clinic {
  id: number;
  name: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  image_url: string;
  background_url: string;
  avatar_url: string;

  constructor(
    id: number,
    name: string,
    address: string,
    description: string,
    latitude: number,
    longitude: number,
    image_url: string,
    background_url: string,
    avatar_url: string,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.image_url = image_url;
    this.background_url = background_url;
    this.avatar_url = avatar_url;
  }
}
