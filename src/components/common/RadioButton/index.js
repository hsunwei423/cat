import style from './style.module.scss';

const RadioButton = ({ name = '', checked = false, onChnage = () => {} }) => {
  return (
    <label className={style.container}>
      <input type="radio" checked={checked} onChange={onChnage} />
      <span>{name}</span>
    </label>
  );
};

export default RadioButton;
