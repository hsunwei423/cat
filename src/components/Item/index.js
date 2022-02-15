import { useState, useEffect } from 'react';
import { getImage } from 'api/catApi';

import Spinner from 'components/common/Spinner';

import style from './style.module.scss';
import PlaceholderImg from 'assets/images/placeholder-612x612.jpg';

const Item = ({
  imgId = '',
  name = '',
  weight = {
    imperial: "",
    metric: ""
  },
  lifeSpan = ''
}) => {
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getImage(imgId)
      .then(res => {
        setImgUrl(res.data.url);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [imgId]);

  if (loading) {
    return (
      <div className={style['loading-wrapper']}>
        <Spinner />
      </div>
    )
  }

  return (
    <div className={style.container}>
      <img
        className={style['img-wrapper']}
        src={imgUrl || PlaceholderImg}
        alt="cat img"
        loading='lazy'
        width="100%"
      />

      <div className={style['detail-container']}>
        <div className={style.name}>{ name }</div>
        <div className={style.weight}>
          <span>{weight.imperial}</span>
          <span>{weight.metric}</span>
        </div>
        <div className={style.lifeSpan}>{ lifeSpan }</div>
      </div>
    </div>
  )
};

export default Item;
