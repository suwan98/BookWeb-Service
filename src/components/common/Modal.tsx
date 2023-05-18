import styled from "styled-components";

const LoginModal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) {
    return null; // 모달이 열려있지 않으면 null을 반환하여 렌더링되지 않도록
  }

  return (
    <div>
      {isOpen && (
        <div>
          <Backdrop onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
              {children}
              <button onClick={onClose}>닫기</button>
            </ModalContainer>
          </Backdrop>
        </div>
      )}
    </div>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  width: 500px;
  height: 500px;
`;

export default LoginModal;
