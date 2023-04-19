import React from "react";
import { modalStyles } from "../../interfaces/modalStyles";
import ReactDom from "react-dom";

export default function Modal({ open, children }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <div style={modalStyles}>{children}</div>,
    document.getElementById("portal")
  );
}
