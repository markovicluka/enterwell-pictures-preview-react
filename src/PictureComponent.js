import React, { Component } from 'react';
import { css } from 'emotion';

const box = css`
    display: grid;
    grid-template-rows: 8fr 1fr 1fr;
    padding: 5px;
`;

const description = css`
    font-family: sans-serif;
    color: #696969;
    text-decoration: none;
    font-size: 13px;
    justify-self: center;
`;

const author = css`
    font-family: sans-serif;
    color: #696969;
    text-decoration: none;
    font-size: 13px;
    cursor: pointer;
    justify-self: center;
`;

const img = css`
    padding: 5px;
    max-height: 200px;
    max-width: 300px;
    cursor: pointer;
    place-self: center;
`;


export class PictureComponent extends Component {

  render() {
    const { children, onPictureClick, onAuthorClick, picture } = this.props;
    return (
      <div className={ box }>
          { children }
          <img className={ img } src={ picture.urls.thumb } onClick={ onPictureClick }/>
          <div className={ description }>{ picture.description }</div>
          <div className={ author } onClick={ this._openModalAuthor } onClick={ onAuthorClick }>{ picture.user.name }</div>
      </div>
    );
  }
}
