import { ConfigProvider, theme } from "antd";
import ReactDOM from "react-dom/client";
import styled, { ThemeProvider } from "styled-components";
import { Probabilities } from "~/2-pages/probabilities";
import "./reset.css";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 0 40px;
  background-color: ${(props) => props.theme.useToken().token.colorBgBase};

  @media (min-width: 1440px) {
    padding: 0;
  }
`;

const Container = styled.div``;

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#7554AB",
          colorBgBase: "rgb(25, 28, 31)",
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <PageContainer>
          <Container>
            <Probabilities />
          </Container>
        </PageContainer>
      </ThemeProvider>
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
