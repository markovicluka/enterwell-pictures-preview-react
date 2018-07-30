import React, { Component } from 'react';
import { css, cx } from 'emotion';

const box = css`
    //margin-top: 50px;
    display: grid;
    grid-template-columns: 35% 10% 10% 10% 35%;
`;

const button = css`
    background-color: #555555;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 14px;
    place-self: center;
    padding: 4px;
    width: 100px;
    transition: all 0.5s;
    cursor: pointer;
`;
const backButton = css`
    grid-column: 2;
`;

const nextButton = css`
    grid-column: 4;
`;

const pageText = css`
    font-family: sans-serif;
    color: #696969;
    text-decoration: none;
    font-size: 13px;
    justify-self: center;
    padding: 4px;
`;


export class NavigationComponent extends Component {

  render() {
    const { onBackClick, onNextClick, pageNumber, buttonWidth } = this.props;
    return (
      <div className={ box }>
          <button onClick={ onBackClick } className={ cx(button, backButton, buttonWidth) }>back</button>
          <div className={ pageText }>{ pageNumber.toString() }</div>
          <button onClick={ onNextClick } className={ cx(button, nextButton, buttonWidth) }>next</button>
      </div>
    );
  }
}
