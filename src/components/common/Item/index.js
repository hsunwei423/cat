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
  // TODO: use imgId to call get images api
  return (
    <div className={style.container}>
      {/* <img className={style['img-wrapper']} src={imgId} alt="cat img" /> */}

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
