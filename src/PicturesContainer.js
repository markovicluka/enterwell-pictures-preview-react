import React, { Component } from 'react';
import { PictureComponent } from './PictureComponent';
import { css, cx } from 'emotion';
import state from './state';
import { observer } from 'mobx-react';
import { action, computed } from 'mobx';
import { ModalPicture } from './ModalPicture';
import { ModalAuthor } from './ModalAuthor';
import { getAllUsersPhotos, getAllPicturesCurated, getPictureStatistics } from './services/api'

const parentDiv = css`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: stretch;
`;

const authorsPicture = css`
  max-height: 30px;
  max-weught: 30px;
  padding: 2px;
  place-self: center;
  cursor: pointer;
`;


@observer
class PicturesContainer extends Component {

  // Stores author information by storing picture object to state.information
  //and allows for author modal to show (Prikaz C)
  @action.bound
  _openModalAuthor(picture){
      state.isModalPictureOpen = false;
      state.isModalAuthorOpen = true;
      state.information = picture;
  }

  // Stores information of clicked picture to state.information
  // and allows for picture modal to show (Prikaz B)
  @action.bound
  _openModalPicture(picture){
      state.isModalAuthorOpen = false;
      state.isModalPictureOpen = true;
      state.information = picture;
  }

  // Called when closing any modal
  // reseting all relevant states
  @action.bound
  _onClose(){
    state.isModalAuthorOpen = false;
    state.isModalPictureOpen = false;
    state.information = {};
    state.statistics = {};
    state.authorsPictures = [];
  }

  // Fetching all curated pictures and storing them in state.pictures
  componentDidMount(){
    getAllPicturesCurated()
      .then((result) => state.pictures.replace(result))
  }

  // Called when state.isModalAuthorOpen is true
  // Fetching all authors pictures and storing them in state.authorsPictures
  @action.bound
  fetchAutorsPictures() {
      getAllUsersPhotos(state.information.user.username)
        .then((result) => state.authorsPictures = result);
  }

  // Called when state.isModalPictureOpen is true
  // Fetching picture statistics and storing them in state.statistics
  @action.bound
  fetchPictureStatistics() {
    getPictureStatistics(state.information.id)
          .then((result) => state.statistics = result);
  }

  render() {
    if(state.isModalAuthorOpen){
        this.fetchAutorsPictures();
    }else if(state.isModalPictureOpen){
        this.fetchPictureStatistics();
    }


    return (
      <div className={parentDiv}>
            {state.pictures.map((picture) =>
                <PictureComponent
                    onPictureClick={() => this._openModalPicture(picture)} // passing function for handling click on picture in component
                    onAuthorClick={() => this._openModalAuthor(picture)} // passing function for handling click on author in component
                    picture={picture} // passing information of picture to a component
                />
            )}
            {
              state.isModalPictureOpen &&
              <ModalPicture onAuthorClick={() => this._openModalAuthor(state.information)} onClose={() => this._onClose()}/>
            }
            {
              state.isModalAuthorOpen &&
              <ModalAuthor onClose={() => this._onClose()}>{ // passing all authors pictures in props.children
                    state.authorsPictures.map((picture) =>
                      <img src={picture.urls.thumb}
                          onClick={ () => this._openModalPicture(picture) }
                          className={ authorsPicture }
                       />)
                     }
              </ModalAuthor>
            }
      </div>
    );
  }
}

export default PicturesContainer;
