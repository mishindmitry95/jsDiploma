import {
  UPLOAD_PHOTOS_REQUEST,
  UPLOAD_PHOTOS_SUCCES,
  UPLOAD_PHOTOS_FAIL,
  LIKE_PHOTO_REQUEST,
  LIKE_PHOTO,
  UNLIKE_PHOTO_REQUEST,
  UNLIKE_PHOTO,
  GET_PHOTO_REQUEST,
  GET_PHOTO_SUCCES
} from "../actions/index.js";

const initialState = {
  isFetching: false,
  error: false,
  photos: []
};

function photos(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_PHOTOS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case UPLOAD_PHOTOS_SUCCES:
      return {
        ...state,
        photos: [...state.photos, ...action.payload],
        isFetching: false
      };

    case UPLOAD_PHOTOS_FAIL:
      return {
        ...state,
        error: true,
        isFetching: false
      };

    case LIKE_PHOTO:
      return {
        ...state,
        isFetching: false,
        photo: {...state.photo, ... action.payload.photo},
        photos: state.photos.map(photo => {
          if (photo.id === action.id) {
            return {
              ...photo,
              ...action.payload.photo
            };
          } else {
            return photo;
          }
        })
      };

    case LIKE_PHOTO_REQUEST: {
      return {
        ...state,
        id: action.id,
        isFetching: true,
      };
    }

    case UNLIKE_PHOTO:
      return {
        photos: state.photos.map(photo => {
          if (photo.id === action.id) {
            return {
              ...photo,
              ...action.payload.photo
            };
          } else {
            return photo;
          }
        })
      };

    case UNLIKE_PHOTO_REQUEST: {
      return {
        ...state,
        photo: action.payload,
        id: action.id,
        isFetching: true
      };
    }

    case GET_PHOTO_REQUEST:
      return {
        ...state,
        photo: action.payload,
        id: action.id,
        isFetching: true
      };

    case GET_PHOTO_SUCCES:
      return {
        ...state,
        photo: action.payload,
        id: action.id,
        isFetching: false
      };
    default:
      return {
        ...state,
        photos: state.photos
      };
  }
}

export default photos;
