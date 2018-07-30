import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

 const modal = css`
    background-color: white;
    height: 400px;
    width: 700px;
    margin: 10% auto 10% auto;
  `;

  const overlay = css`
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.9);
    overflow-x: hidden;
    transition: 0.9s;
  `;

  const button = css`
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 10px;
    margin-right: 20px;
    color: white;
    cursor: pointer;

  `;


  const modalAuthorGrid = css`
    display: grid;
    grid-template-columns: 3fr 2fr;
    place-content: stretch;
    grid-auto-rows: 66px;
  `;

  const imgModal = css`
    max-height: 350px;
    max-width: 350px;
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: 3;
    place-self: center;
    padding: 25px;
  `;

  const modalText = css`
    font-family: sans-serif;
    color: #696969;
    text-decoration: none;
    font-size: 13px;
    align-self: center;
  `;

  const authorsPictures = css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: end;
    grid-column: 1;
    grid-row-start: 3;
    grid-row-end: 7;
  `;


@observer
export class ModalAuthor extends Component {

  render() {
    const { children, onClose, state } = this.props;
    const noInformation = 'No information available';
     return (
      <div className={ overlay }>
          <div className={ modal }>
            <div className={ modalAuthorGrid }>
              <img src={ state.information.user.profile_image.large } className={imgModal}/>
              <div className={ modalText }>Name: { state.information.user.name || noInformation }</div>
              <div className={ modalText }>Bio: { state.information.user.bio || noInformation }</div>
              <div className={ authorsPictures }>{ children }</div>
              <div className={ modalText }>Location: { state.information.user.location || noInformation }</div>
              <div className={modalText}>Instagram username: { state.information.user.instagram_username || noInformation }</div>
              <a href={ state.information.user.portfolio_url } className={ modalText }>Portfolio</a>

            </div>
            <div className={ button } onClick={ onClose }>✖</div>
          </div>
      </div>
    );
  }
}
