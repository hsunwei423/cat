import style from "./style.module.scss";

const Spinner = () => {
  return (
    <div class={style["lds-ring"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
