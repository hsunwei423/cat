import { useState, useEffect, useCallback, useRef } from 'react';
import { getBreed } from 'api/catApi';
import { debounce } from 'lodash-es';

import Input from 'componentss/common/Input';

import style from './style.module.scss';

const Landing = () => {
  const [name, setName] = useState('');
  const nameRef = useRef(name);

  const getData = useCallback(debounce(() => {
    getBreed(nameRef.current)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    })
  }, 1000), []);

  const handleInputChange = (value) => {
    setName(value);
    nameRef.current = value;
    getData();
  }

  return (
    <div>
      <h1 className={style.title}>Search Cat</h1>
      <div className={style['search-input-wrapper']}>
        <Input placeholder='input cat name' onChange={handleInputChange} value={name} />
      </div>
    </div>
  )
};

export default Landing;