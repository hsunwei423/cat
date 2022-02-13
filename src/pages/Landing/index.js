import { useState, useEffect } from 'react';
import { getBreed } from 'api/catApi';

import Input from 'componentss/common/Input';

import style from './style.module.scss';

const Landing = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    getBreed(name)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
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