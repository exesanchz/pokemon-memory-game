import styled, { css } from "styled-components";
import { ModalEnum } from "../../types/ModalTypes";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 40px;

  @media (max-width: 600px) {
    max-width: 200px;
    flex-direction: column-reverse;
  }
`;

export const ModalColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 5px 20px 0;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 600px) {
    align-items: center;
    justify-content: center;
  }
`;

type ModalProps = {
  type: ModalEnum | undefined;
};

const sharedTextStyles = css`
  margin: 5px;
  max-width: 250px;
  text-align: left;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const ModalTitle = styled.h2<ModalProps>`
  ${sharedTextStyles}
  color: ${(props) =>
    props.type === ModalEnum.Error
      ? props.theme.colors.primaryError
      : props.theme.colors.primaryYellow};

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const ModalMessage = styled.p`
  ${sharedTextStyles}
  color: ${({ theme }) => theme.colors.secondary};
`;

export const PokemonImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 200px;
  border-radius: 4px;
  margin-top: 10px;
`;

export const ModalButton = styled.button`
  min-width: 80px;
  min-height: 20px;
  margin: 10px 0 0 5px;

  background-color: ${({ theme }) => theme.colors.primaryButton};
  border-radius: 10px;
  border-width: 0;
  color: ${({ theme }) => theme.colors.ButonText};
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;
