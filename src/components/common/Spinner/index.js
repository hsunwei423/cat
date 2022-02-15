import style from "./style.module.scss";

const Spinner = () => {
  return (
    <div className={style["lds-ring"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
