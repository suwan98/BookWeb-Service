import styled from "styled-components";
import Header from "../components/common/Header";
import Main from "../components/MainPageContent/Main";
import Footer from "../components/common/Footer";
const Home = () => {
  return (
    <>
      <Container>
        <Header />
        <Main />
        <Footer />
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
