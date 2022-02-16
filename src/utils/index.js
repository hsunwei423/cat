export const customizeDebounce = (fn, delay = 0) => {
  let timer = null;

  return (...args) => {
    const context = this;

    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);    
  }
};