import React from 'react';
import classNames from 'classnames';
import './Bage.scss';

export default function Bage({ color, onClick, className }) {
  return (
    <i
      className={classNames('bage', { [`bage--${color}`]: color }, className)}
      onClick={onClick}></i>
  );
}
