import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class PhotosList extends PureComponent {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
     const { photos, getPhotos } = this.props;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const clientHeight = document.body.clientHeight;

    const scrollOnBottom = clientHeight - scrollTop;
    if (windowHeight - scrollOnBottom === 0) {
      return this.props.getPhotos(this.props.photos);
    }
  }

  render() {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return (
      <div className="photolist-container">
        <ul className="flex-container">
          {this.props.photos.map((photo, id) => (
            <li key={id}>
              <div className="item_container">
                <Link to={`/photo/${photo.id}`}>
                  <img src={photo.urls.regular} alt="photo" key={id} height="350px" width="100%"/>
                </Link>
                <div className="info-container">
                <div className="date_container">
                  {new Date(photo.created_at).toLocaleString("ru", options)}
                </div>
                <div className="container__btn_like">
                  {photo.liked_by_user ? (
                    <button
                      className="btn_like__clicked"
                      onClick={() => this.props.getUnlikeToPhoto(photo.id)}
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
                      onClick={() => this.props.getLikeToPhoto(photo.id)}
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
                  {" " + photo.likes}
                </div>
                <div className="user_photo_name">
                  <a href={photo.user.links.html} className="user_link">
                    <img
                      src={photo.user.profile_image.small}
                      className="user_img"
                    />
                    <h3 className="user_name">{photo.user.name}</h3>
                  </a>
                </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button className="loadphoto_btn" onClick={this.props.getPhotos}>
          Загрузить еще
        </button>
      </div>
    );
  }
}
