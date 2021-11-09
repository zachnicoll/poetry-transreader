import React, { useState } from 'react';
import { LanguageResponse, PoemResponse } from 'API/types';
import Modal from 'react-modal';
import Select from 'react-select';
import { Close } from '@material-ui/icons';
import useTranslatePoem from 'Hooks/useTranslatePoem';
import * as styles from './styles';
import PoemBox from './molecules/PoemBox';
import { languagesToSelectOptions, SelectOption } from './util';

interface TranslateModalProps extends Modal.Props {
  poem: PoemResponse;
  languages: LanguageResponse[];
  onClose: () => void;
  onPlay: (audioBuffer: ArrayBuffer) => void;
}

Modal.setAppElement('#__next');

const TranslateModal: React.FC<TranslateModalProps> = ({
  poem,
  languages,
  onClose,
  onPlay,
  ...modalProps
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SelectOption | null>(
    null
  );
  const { translatedPoem } = useTranslatePoem(poem, selectedLanguage?.value);

  return (
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
            options={languagesToSelectOptions(languages)}
            onChange={setSelectedLanguage}
            value={selectedLanguage}
          />
        </styles.SelectContainer>

        <PoemBox
          poem={translatedPoem}
          onPlay={onPlay}
          language={selectedLanguage?.value}
        />
      </styles.InnerContainer>
    </Modal>
  );
};

export default TranslateModal;
