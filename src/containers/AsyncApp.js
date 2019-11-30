import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPhotos,
  getLikeToPhoto,
  getSinglePhoto,
  getUnlikeToPhoto
} from "../actions/index.js";
import PhotosList from "../components/photos-list.js";
import Photo from "../components/photo.js";
import { Route, Switch, withRouter } from "react-router-dom";

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      photos: [],
    };
  }

  componentDidMount() {
    const { photos, getPhotos } = this.props;
    return getPhotos(photos);
  }


  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <PhotosList
                photos={this.props.photos}
                getLikeToPhoto={this.props.getLikeToPhoto}
                getPhotos={this.props.getPhotos}
                getUnlikeToPhoto={this.props.getUnlikeToPhoto}
              />
            )}
          />
          <Route
            path="/photo/:id"
            render={props => <Photo {...this.props} {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photos: state.photos,
    photo: state.photo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPhotos: photos => dispatch(getPhotos(photos)),
    getLikeToPhoto: id => dispatch(getLikeToPhoto(id)),
    getSinglePhoto: id => dispatch(getSinglePhoto(id)),
    getUnlikeToPhoto: id => dispatch(getUnlikeToPhoto(id))
  };
};

let PhotoWithUrlData = withRouter(Photo);

export default connect(mapStateToProps, mapDispatchToProps)(
  AsyncApp,
  PhotoWithUrlData
);
