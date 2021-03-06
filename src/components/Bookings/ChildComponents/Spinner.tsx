import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

interface ISpinner {
  visible: boolean;
}

export default function Spinner({ visible }: ISpinner) {
  if (visible) {
    return (
      <SpinnerContainer>
        <Loader type="BallTriangle" color="#ff7b51" height={115} width={115} />
      </SpinnerContainer>
    );
  } else {
    return null;
  }
}

//for debug purposes
Spinner.defaultProps = {
  visible: true,
};
