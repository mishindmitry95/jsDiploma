import Unsplash, { toJson } from "unsplash-js";

export const UPLOAD_PHOTOS_REQUEST = "UPLOAD_PHOTOS_REQUEST";
export const UPLOAD_PHOTOS_SUCCES = "UPLOAD_PHOTOS_SUCCES";
export const UPLOAD_PHOTOS_FAIL = "UPLOAD_PHOTOS_FAIL";
export const LIKE_PHOTO_REQUEST = "LIKE_PHOTO_REQUEST";
export const LIKE_PHOTO = "LIKE_PHOTO";
export const UNLIKE_PHOTO_REQUEST = "LIKE_PHOTO_REQUEST";
export const UNLIKE_PHOTO = "LIKE_PHOTO";
export const GET_PHOTO_REQUEST = "GET_PHOTO_REQUEST";
export const GET_PHOTO_SUCCES = "GET_PHOTO_SUCCES";

const unsplash = new Unsplash({
  applicationId:
    "348a251e78af97fd68b979ae0ffc0dfaaca29d02c922838f70448147cf331d81",
  secret: "70a86a0045e3e2f4fc3461a6a8ea41e599f9cf66b17632a318e84cbf8cb62ceb",
  bearerToken: sessionStorage.getItem("tokenCode")
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes"
]);

export function uploadPhotosRequest(photos) {
  return {
    type: UPLOAD_PHOTOS_REQUEST,
    payload: photos
  };
}

export function uploadPhotosSucces(photos, json) {
  return {
    type: UPLOAD_PHOTOS_SUCCES,
    payload: json
  };
}

export function uploadPhotosFail(photos) {
  return {
    type: UPLOAD_PHOTOS_FAIL,
    payload: photos
  };
}

export function likePhoto(json, id) {
  return {
    type: LIKE_PHOTO,
    payload: json,
    id
  };
}

export function likePhotoRequest(id) {
  return {
    type: LIKE_PHOTO_REQUEST,
    id
  };
}

export function unlikePhoto(json, id) {
  return {
    type: UNLIKE_PHOTO,
    payload: json,
    id
  };
}

export function unlikePhotoRequest(id) {
  return {
    type: UNLIKE_PHOTO_REQUEST,
    id
  };
}

export function getPhotoRequest(id) {
  return {
    type: GET_PHOTO_REQUEST,
    id
  };
}

export function getPhotoSucces(json, id) {
  return {
    type: GET_PHOTO_SUCCES,
    payload: json,
    id
  };
}

let i = 1;
export function getPhotos(photos) {
  return dispatch => {
    dispatch(uploadPhotosRequest(photos));
    return unsplash.photos
      .listPhotos(i++, 10)
      .then(toJson)
      .then(json => {
        dispatch(uploadPhotosSucces(photos, json));
      });
  };
}

export function getLikeToPhoto(id) {
  return dispatch => {
    dispatch(likePhotoRequest(id));
    return unsplash.photos
      .likePhoto(id)
      .then(toJson)
      .then(json => {
        dispatch(likePhoto(json, id));
      });
  };
}

export function getUnlikeToPhoto(id) {
  return dispatch => {
    dispatch(unlikePhotoRequest(id));
    return unsplash.photos
      .unlikePhoto(id)
      .then(toJson)
      .then(json => {
        dispatch(unlikePhoto(json, id));
      });
  };
}

export function getSinglePhoto(id) {
  return dispatch => {
    dispatch(getPhotoRequest(id));
    return unsplash.photos
      .getPhoto(id)
      .then(toJson)
      .then(json => {
        dispatch(getPhotoSucces(json, id));
      });
  };
}
