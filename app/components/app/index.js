import React, { useState, useCallback } from 'react';
import upfirst from '../../modifiers/upfirst';
import Armory from '../armory';
import Header from '../header';

import './styles.css';

export default function App({ characters }) {
  const [active, setActive ] = useState(characters[0]);
  const items = characters.map(function map(char) {
    const onClick = useCallback(function activate(e) {
      if (e && e.preventDefault) e.preventDefault();

      setActive(char);
    }, [ char ]);

    return { name: upfirst(char.char), onClick, active: char === active };
  });

  return (
    <>
      <Header items={ items } />
      <Armory character={ active } />
    </>
  );
}
