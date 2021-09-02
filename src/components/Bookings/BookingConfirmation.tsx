import styled from "styled-components";

export const BookingConfirmation = () => {
  const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    h1 {
      font-size: 3rem;
    }
  `;

  return (
    <StyledDiv>
      <h1>Thanks for your booking</h1>
      <p>Be sure to check your email for a booking confirmation</p>
      <p>
        Click here to get back to <a href="/">Home</a>
      </p>
    </StyledDiv>
  );
};
