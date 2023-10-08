import React, { Component } from "react";
import ProductDataService from "../services/productService";
import ImageDataService from "../services/imageService";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      price: "",
      image: false,
      file: null,
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeImage(e) {
    this.setState({file:e.target.files[0]});
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    this.setState(prevState => ({
      image: imageUrl
    }));
  }

  onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage',this.state.file);
    console.log("this.state.file", this.state.file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    ImageDataService.upload(formData, config).then(
        response => {
          console.log(response.data);
          this.setState({
            message: "The image is successfully uploaded"
          });
          const imgUrl = "http://localhost:5001/images/" + response.data?.imageName
          this.setState(prevState => ({
            image: imgUrl
          }));
        })
        .catch(e => {
          console.log(e);
        });
  }

  saveProduct() {
    let data = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      image: this.state.image
    };

    ProductDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
      id: null,
      name: "",
      description: "",
      price: "",
      image: "false",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                  type="text"
                  className="form-control"
                  id="price"
                  required
                  value={this.state.price}
                  onChange={this.onChangePrice}
                  name="price"
              />
            </div>

            <form onSubmit={this.onFormSubmit}>
              <label htmlFor="Image">image</label>
              <input type="file" name="myImage" onChange= {this.onChangeImage} />
              <button type="submit">Upload</button>
            </form>
            {this.state.image && <div><img src={this.state.image} width='100' height='100' /></div>}

            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
