import React, { useEffect, useState } from "react";
import {
  ModalWrapper,
  ModalContent,
  ModalTitle,
  ModalMessage,
  PokemonImage,
  ModalColumn,
  ModalButton,
} from "./Modal.styles";
import { ModalEnum } from "../../types/ModalTypes";
import victoryImage from "../../assets/images/pikachu-victory.png";
import errorImage from "../../assets/images/magikarp-error.png";

type ModalProps = {
  isOpen: boolean;
  type: ModalEnum | undefined;
  title: string;
  message: string;
  callback?: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  type,
  title,
  message,
  callback,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    if (callback) {
      callback();
    }
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalContent>
        <ModalColumn>
          <ModalTitle type={type}>{title}</ModalTitle>
          <ModalMessage>{message}</ModalMessage>
          <ModalButton onClick={handleClose}>Close</ModalButton>
        </ModalColumn>
        <PokemonImage
          src={type === ModalEnum.Error ? errorImage : victoryImage}
          alt="pokemon-modal-image"
        />
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
