import styled, { css } from 'styled-components';
// import { isMobile } from 'react-device-detect';
import ReactDOM from 'react-dom';
import { ReactComponent as Close } from '../../../../assets/images/x.svg';

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 6, 41, 0.5);
  z-index: 500;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: 380px;
  min-width: 400px;
  outline: 0;
`;

const StyledModal = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: auto;
  border-radius: 10px;
  border: 1px solid black;
  ${({ fullScreen }) =>
    fullScreen &&
    css`
      @media only screen and (max-width: 768px) {
        height: 100vh;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: fixed;
        display: block;
        border: none;
      }
    `}
`;

const Header = styled.div`
  display: flex;
  padding: 24px;
  border-bottom: 1px solid black;
`;
const HeaderText = styled.div`
  color: #000629;
  flex: 1;
  font-size: 1.1rem;
`;

const CloseIcon = styled.div`
  color: var(--header-text);
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.chaliceGray};
  }
`;

interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  header: JSX.Element;
  hideHeader?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (any?: any) => void;
  onCancel?: () => void;
  children: JSX.Element;
  maxWidth?: number;
  fullScreen?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
  header,
  hideHeader,
  children,
  fullScreen,
}) => {
  const modal = (
    // <Backdrop onClick={onDismiss}>
    <Backdrop onClick={console.log('dismiss')}>
      <Wrapper>
        <StyledModal fullScreen={fullScreen}>
          {!hideHeader && (
            <Header>
              <HeaderText>{header}</HeaderText>
              <CloseIcon onClick={onDismiss}>
                <CloseColor />
              </CloseIcon>
            </Header>
          )}
          {children}
        </StyledModal>
      </Wrapper>
    </Backdrop>
  );

  return isOpen ? ReactDOM.createPortal(modal, document.body) : null;
};
Modal.propTypes = {};
Modal.defaultProps = {};
Modal.displayName = 'Modal';
export default Modal;
