import style from './style.module.scss';

const RadioButton = ({ name = '', checked = false }) => {
  return (
    <label className={style.container}>
      <input type="radio" />
      <span>{name}</span>
    </label>
  );
};

export default RadioButton;
