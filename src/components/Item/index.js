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
        <div className={style.list}>
          <span>Name</span>
          <span className={style.name}>{ name || '-' }</span>
        </div>
        <div className={style.list}>
          <span>Imperial</span>
          <span className={style.weight}>{ weight.imperial || '-' }</span>
        </div>
        <div className={style.list}>
          <span>Metric</span>
          <span>{ weight.metric || '-' }</span>
        </div>
        <div className={style.list}>
          <span>Life Span</span>
          <span>{ lifeSpan || '-' }</span>
        </div>
      </div>
    </div>
  )
};

export default Item;
