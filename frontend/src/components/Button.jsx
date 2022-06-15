import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { IoCaretBack } from 'react-icons/io5';

const Button = ({ nav, url }) => {
  const [text, setText] = useState('Home');

  useEffect(() => {
    if (nav !== '') {
      setText(nav);
    }
  }, [nav]);

  return (
    <Link to={url} className='btn btn-back btn-sm'>
      <IoCaretBack className='btn-icon' />
      {text}
    </Link>
  );
};

export default Button;
