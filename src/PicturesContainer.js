import React, { Component } from 'react';
import { PictureComponent } from './PictureComponent';
import { css } from 'emotion';
import state from './state';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { ModalPicture } from './ModalPicture';
import { ModalAuthor } from './ModalAuthor';
import { getAllUsersPhotos, getAllPicturesCurated, getPictureStatistics } from './services/api'
import { NavigationComponent } from './NavigationComponent'

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

const navigation = css`
  position: absolute;
  top: 550px;
  width: 100%;
  margin-top: 50px;
`;

@observer
class PicturesContainer extends Component {

  // Stores author information by storing picture object to state.information
  //and allows for author modal to show
  @action.bound
  _openModalAuthor(picture){
      state.isModalPictureOpen = false;
      state.isModalAuthorOpen = true;
      state.information = picture;
      this.fetchAutorsPictures();
  }

  // Stores information of clicked picture to state.information
  // and allows for picture modal to show
  @action.bound
  _openModalPicture(picture){
      state.isModalAuthorOpen = false;
      state.isModalPictureOpen = true;
      state.information = picture;
      this.fetchPictureStatistics();
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


  componentDidMount(){
    this.fetchPicturesCurated(state.pageNumber);
  }

  // Fetching all curated pictures and storing them in state.pictures
  @action.bound
  fetchPicturesCurated(page) {
    getAllPicturesCurated(page)
      .then((result) => state.pictures.replace(result));
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

  // Pagination. Pages start from 1, so if it is 1 if-condition is true and backButton would cause page go to 0
  // After updating state.pageNumber, new fetch is called with new parameter
  @action.bound
  _onNavigationButtonClick(backOrNext) {
    return action((event) => {
      if(state.pageNumber >= 1 ){
        backOrNext === 'back' ? state.pageNumber-- : state.pageNumber++;
        state.pageNumber === 0 && (state.pageNumber = 1);
        this.fetchPicturesCurated(state.pageNumber);
      }
    });
  }

  render() {

    //console.log("render");
    return (
      <div className={ parentDiv }>
            { state.pictures.map((picture) =>
                <PictureComponent
                    onPictureClick={ () => this._openModalPicture(picture) } // passing function for handling click on picture in component
                    onAuthorClick={ () => this._openModalAuthor(picture) } // passing function for handling click on author in component
                    picture={ picture } // passing information of picture to a component
                />
              )
             }
            {
              state.isModalPictureOpen &&
              <ModalPicture
                  onAuthorClick={ () => this._openModalAuthor(state.information) }
                  onClose={ () => this._onClose() }
              />
            }
            {
              state.isModalAuthorOpen &&
              <ModalAuthor onClose={ () => this._onClose() } state={ state }>{
                    state.authorsPictures.map((picture) =>                       // passing all authors pictures in props.children
                      <img src={picture.urls.thumb}
                          onClick={ () => this._openModalPicture(picture) }
                          className={ authorsPicture }
                       />
                     )
              }
              </ModalAuthor>
            }
            <div className={ navigation }>
              <NavigationComponent onBackClick={ this._onNavigationButtonClick('back') } onNextClick={ this._onNavigationButtonClick('next') } pageNumber={ state.pageNumber }/>
            </div>
      </div>
    );
  }
}

export default PicturesContainer;
