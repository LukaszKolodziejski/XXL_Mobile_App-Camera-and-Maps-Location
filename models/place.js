class Place {
  constructor(id, title, imageUri, address = null, lat = null, lng = null) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
  }
}

export default Place;
