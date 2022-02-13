import style from './style.module.scss';

const Input = ({
  placeholder = '',
  name = '',
  value = '',
  onChange = () => {}
}) => {

  const handleOnChange = e => {
    onChange(e.target.value);
  }

  return (
    <input
      className={style.container}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  )
};

export default Input;