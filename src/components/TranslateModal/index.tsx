import React from 'react';
import { LanguageResponse, PoemResponse } from 'API/types';
import Modal from 'react-modal';
import Select from 'react-select';
import { Close } from '@material-ui/icons';
import * as styles from './styles';
import PoemBox from './molecules/PoemBox';

interface TranslateModalProps extends Modal.Props {
  poem: PoemResponse;
  languages: LanguageResponse[];
  onClose: () => void;
  onPlay: (audioBuffer: ArrayBuffer) => void;
}

const TranslateModal: React.FC<TranslateModalProps> = ({
  poem,
  languages,
  onClose,
  onPlay,
  ...modalProps
}) => (
  <Modal
    {...modalProps}
    className="modal-container"
    overlayClassName="modal-overlay"
  >
    <styles.HeaderContainer>
      <h1>Translate Poem - {poem.title}</h1>

      <styles.CloseContainer onClick={onClose}>
        <Close />
      </styles.CloseContainer>
    </styles.HeaderContainer>

    <styles.InnerContainer>
      <PoemBox poem={poem} onPlay={onPlay} />

      <styles.SelectContainer>
        <p>Translate to:</p>
        <Select
          options={languages.map((language) => ({
            value: language.code,
            label: language.name
          }))}
        />
      </styles.SelectContainer>

      <PoemBox poem={poem} onPlay={onPlay} />
    </styles.InnerContainer>
  </Modal>
);

export default TranslateModal;
