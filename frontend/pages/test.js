import styles from '../styles/Terminal.module.css';

function Test() {

  return (
    <div>
      <h1>Terminal</h1>
      <object className={styles.terminalContainer} data="https://192.168.1.10:6175" />
    </div>
  );
};

export default Test;