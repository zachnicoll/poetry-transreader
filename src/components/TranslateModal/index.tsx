import React from "react";
import { PoemResponse } from "API/types";
import Modal from "react-modal";

interface TranslateModalProps extends Modal.Props {
  poem: PoemResponse;
}

const TranslateModal: React.FC<TranslateModalProps> = ({
  poem,
  ...modalProps
}) => (
  <Modal {...modalProps}>
    <p>{poem.lines.join("\n")}</p>
  </Modal>
);

export default TranslateModal;
