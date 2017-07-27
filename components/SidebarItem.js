// eslint-disable-next-line
'use strict'

import React from 'react';

export default class SidebarItem extends React.Component {

  getTitle(file){   // Find first non-empty line and use as title.
    return file.split('\n').find(line => line.length);
  }

  render() {
    const { file = '', onClick, isSelected } = this.props;
    const title = this.getTitle(file);
    let sidebarItemClass = 'sidebar__item';
    if(isSelected) sidebarItemClass += ' sidebar__item--selected';
    return (
      <li className={sidebarItemClass}>
        <a href="#" onClick={onClick} className='sidebar__link'>
          {title || <em>Untitled</em>}
        </a>
      </li>
    );
  }
}
