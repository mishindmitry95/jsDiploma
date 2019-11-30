import React, { Component } from "react";
import { Link } from "react-router-dom";

class Photo extends Component {
  componentDidMount() {
    this.props.getSinglePhoto(this.props.match.params.id);
  }

  render() {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    if (this.props.photo === undefined) {
      return <div className="item_container">...Loading</div>;
    } else {
      return (
        <div className="flex-container__photo">
          <div className="item_container item_container__photo">
            <img src={this.props.photo.urls.regular} alt="photo" height="630px" width="100%"/>
            
            <div className="info-container__photo">
            <div className="date_container__photo">
              {new Date(this.props.photo.created_at).toLocaleString("ru", options)}
            </div>
            <div className="container__btn_like__photo">
              {this.props.photo.liked_by_user ? (
                <button
                  className="btn_like__clicked"
                  onClick={() =>
                    this.props.getUnlikeToPhoto(this.props.photo.id)
                  }
                >
                  <svg
                    className="svg_img"
                    version="1.1"
                    viewBox="0 0 32 32"
                    width="16"
                    height="16"
                    aria-hidden="false"
                  >
                    <path d="M17.4 29c-.8.8-2 .8-2.8 0l-12.3-12.8c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.3 0l2.4 2.8 2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4l-12.2 12.8z"></path>
                  </svg>
                </button>
              ) : (
                <button
                  className="btn_like"
                  onClick={() => this.props.getLikeToPhoto(this.props.photo.id)}
                >
                  <svg
                    className="svg_img"
                    version="1.1"
                    viewBox="0 0 32 32"
                    width="16"
                    height="16"
                    aria-hidden="false"
                  >
                    <path d="M17.4 29c-.8.8-2 .8-2.8 0l-12.3-12.8c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.3 0l2.4 2.8 2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4l-12.2 12.8z"></path>
                  </svg>
                </button>
              )}
              {" " + this.props.photo.likes}
            </div>
            <div className="user_photo_name__photo">
              <a href={this.props.photo.user.links.html} className="user_link">
                <img
                  src={this.props.photo.user.profile_image.small}
                  className="user_img"
                />
                <h3 className="user_name">{this.props.photo.user.name}</h3>
              </a>
            </div>
            </div>
          </div>
          <div className="btn_back-container">
            <Link to={`/`}>
              <button className="btn_back">Назад</button>
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default Photo;
