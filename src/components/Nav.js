import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Nav = props => {
  return (
    <nav className="nav">
      <h2>AI|music player</h2>
      <button
        onClick={() => {
          props.setLibraryStatus(!props.libraryStatus);
        }}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
