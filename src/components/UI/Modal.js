import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={props.onClick} />,
      <ModalOverlay>{props.children}</ModalOverlay>
    </>,
    document.getElementById("overlays")
  );
};

export default Modal;
