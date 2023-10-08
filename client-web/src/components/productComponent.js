import React, { Component } from "react";
import ProductDataService from "../services/productService";
import ImageDataService from "../services/imageService";
import { withRouter } from '../common/with-router';

class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        name: "",
        description: "",
        price: "",
        image: "",
        published: false,
      },
      file: null,
      message: ""
    };
  }

  componentDidMount() {
    this.getProduct(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        description: description
      }
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        price: price
      }
    }));
  }

  getProduct(id) {
    ProductDataService.get(id)
      .then(response => {
        this.setState({
          currentProduct: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentProduct.id,
      name: this.state.currentProduct.name,
      description: this.state.currentProduct.description,
      price: this.state.currentProduct.price,
      published: status
    };

    ProductDataService.update(this.state.currentProduct.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentProduct: {
            ...prevState.currentProduct,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProduct() {
    ProductDataService.update(
      this.state.currentProduct.id,
      this.state.currentProduct
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The product was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduct() {    
    ProductDataService.delete(this.state.currentProduct.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/products');
      })
      .catch(e => {
        console.log(e);
      });
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
            currentProduct: {
              ...prevState.currentProduct,
              image: imgUrl
            }
          }));
        })
        .catch(e => {
          console.log(e);
        });
  }
  onImageChange(e) {
    this.setState({file:e.target.files[0]});
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        image: imageUrl
      }
    }));
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Product</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentProduct.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProduct.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={currentProduct.price}
                    onChange={this.onChangePrice}
                />
              </div>

              {/*<div className="form-group">*/}
              {/*  <label>*/}
              {/*    <strong>Status:</strong>*/}
              {/*  </label>*/}
              {/*  {currentProduct.published ? "Published" : "Pending"}*/}
              {/*</div>*/}
            </form>

            <form onSubmit={this.onFormSubmit}>
              <label htmlFor="Image">image</label>
              <input type="file" name="myImage" onChange= {this.onImageChange} />
              <button type="submit">Upload</button>
            </form>
            {currentProduct.image && <div><img src={currentProduct.image} width='100' height='100' /></div>}

            {/*{currentProduct.published ? (*/}
            {/*  <button*/}
            {/*    className="badge badge-primary mr-2"*/}
            {/*    onClick={() => this.updatePublished(false)}*/}
            {/*  >*/}
            {/*    UnPublish*/}
            {/*  </button>*/}
            {/*) : (*/}
            {/*  <button*/}
            {/*    className="badge badge-primary mr-2"*/}
            {/*    onClick={() => this.updatePublished(true)}*/}
            {/*  >*/}
            {/*    Publish*/}
            {/*  </button>*/}
            {/*)}*/}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduct}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProduct}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Product);