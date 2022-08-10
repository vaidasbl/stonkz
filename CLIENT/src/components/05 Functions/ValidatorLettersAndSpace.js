export const validate = (e, setInputString, setValid) => {
  const regex = /^[a-zA-Zą-ž\s\d-]+$/;
  if (e.target.value === "" || regex.test(e.target.value)) {
    setInputString(e.target.value);
  } else {
    setValid(false);
    setTimeout(() => setValid(true), 1000);
  }
};
