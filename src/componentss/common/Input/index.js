import style from './style.module.scss';

const Input = ({
  placeholder = '',
  name = '',
  value = ''
}) => {
  return (
    <input
      className={style.container}
      name={name}
      value={value}
      placeholder={placeholder}
    />
  )
};

export default Input;