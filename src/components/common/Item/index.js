import { useState, useEffect } from 'react';
import { getImage } from 'api/catApi';

import style from './style.module.scss';

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

  return (
    <div className={style.container}>
      { /** loading spinner */}


      {
        !loading &&
          <img
            className={style['img-wrapper']}
            src={imgUrl}
            alt="cat img"
            loading='lazy'
            width="100%"
          />
      }

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
