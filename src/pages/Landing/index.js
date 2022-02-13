import { useState, useEffect } from 'react';

import Input from 'componentss/common/Input';

import style from './style.module.scss';

const Landing = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    // TODO: fetch api
  }, [name]);

  return (
    <div>
      <h1 className={style.title}>Search Cat</h1>
      <div className={style['search-input-wrapper']}>
        <Input placeholder='input cat name' onChange={setName} value={name} />
      </div>
    </div>
  )
};

export default Landing;