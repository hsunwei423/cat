import { useState, useEffect, useCallback, useRef } from 'react';
import { getBreed } from 'api/catApi';
import { debounce } from 'lodash-es';

import Input from 'components/common/Input';
import Item from 'components/common/Item';

import style from './style.module.scss';

const Landing = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const nameRef = useRef(name);

  const getData = () => {
    getBreed(nameRef.current)
      .then(res => {
        console.log(res);
        setList(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const getDataDebounce = useCallback(debounce(() => {
    getData();
  }, 1000), []);

  const handleInputChange = (value) => {
    const val = value || '';
    setName(val);
    nameRef.current = val;
    if (val.length > 2) {
      getDataDebounce();
    } else {
      getData();
    }
  }

  return (
    <div>
      <h1 className={style.title}>Search Cat</h1>
      <div className={style['search-input-wrapper']}>
        <Input placeholder='input cat name' onChange={handleInputChange} value={name} />
      </div>

      <div className={style['item-container']}>
        {
          list.map(d => {
            return (
              <Item 
                key={d.name}
                imgId={d.reference_image_id}
                name={d.name}
                weight={d.weight}
                lifeSpan={d.life_span}
              />
            )
          })
        }
      </div>
    </div>
  )
};

export default Landing;