export class Patient {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  relation_with_user: string;
  id_number: string;
  image_url: string;
  social_security_number: string;
  id_type: string;
  files_url: string;
  date_of_birth: string;
  patient_email: string;
  phone_number: string;

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    address: string,
    relation_with_user: string,
    id_number: string,
    image_url: string,
    social_security_number: string,
    id_type: string,
    files_url: string,
    date_of_birth: string,
    patient_email: string,
    phone_number: string,
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.address = address;
    this.date_of_birth = date_of_birth;
    this.id_type = id_type;
    this.id_number = id_number;
    this.relation_with_user = relation_with_user;
    this.image_url = image_url;
    this.social_security_number = social_security_number;
    this.files_url = files_url;
    this.patient_email = patient_email;
    this.phone_number = phone_number;
  }
}
