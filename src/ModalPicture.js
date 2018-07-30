import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css, cx } from 'emotion';
import state from './state';

 const modal = css`
    background-color: white;
    height: 400px;
    width: 700px;
    margin: 10% auto 10% auto;
    align-content: stretch;
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

  const buttonClose = css`
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 10px;
    margin-right: 20px;
    color: white;
    cursor: pointer;

  `;


  const modalPictureGrid = css`
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-auto-rows: 66px;
    place-content: stretch;
  `;

  const imgModal = css`
    max-height: 350px;
    max-width: 350px;
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: 7;
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

  const pointer = css`
    cursor: pointer;
  `;

 @observer
export class ModalPicture extends Component {

  render() {
    const { onAuthorClick, onClose } = this.props;
    const noInformation = 'No information available';
    return (
      <div className={overlay}>
        <div className={modal}>
          <div className={modalPictureGrid}>
            <img src={state.information.urls.raw} className={imgModal}/>
            <div className={ modalText }>Created at: { state.information.created_at.split('T')[0] || noInformation }</div>
            <div className={ modalText }>Description: { state.information.description || noInformation }</div>
            <div className={ modalText }>Downloads: { state.statistics.downloads ? state.statistics.downloads.total : '' }</div>
            <div className={ modalText }>Views: { state.statistics.views ? state.statistics.views.total : noInformation }</div>
            <div className={ modalText }>Likes: { state.statistics.likes ? state.statistics.likes.total : noInformation }</div>
            <div className={ cx(modalText, pointer) } onClick={ onAuthorClick }>Author: { state.information.user.name || noInformation }</div>
          </div>
          <div className={ buttonClose } onClick={ onClose }>✖</div>
        </div>
      </div>
    );
  }
}
