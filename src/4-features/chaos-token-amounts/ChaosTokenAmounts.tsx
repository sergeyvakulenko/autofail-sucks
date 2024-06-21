import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { TOnChangeToken, TToken } from "~/5-entities/Token";
import { AntdButton } from "~/6-shared/ui-kit/AntdButton";
import { Token } from "~/6-shared/ui-kit/Token";

const Container = styled.div`
  width: 99%;
  height: 45px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const TokensContainer = styled.div<{ $amount: number }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-left: ${(props) => (props.$amount <= 5 ? "-25px" : "-40px")};
  position: relative;
`;

const TokenContainer = styled.div<{ $amount: number; $opacity?: number }>`
  width: ${(props) => (props.$amount <= 5 ? "20px" : "10px")};
  opacity: ${(props) => (props.$opacity ? props.$opacity : 1)};
  display: flex;
  transition: opacity 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
`;

type TProps = {
  token: TToken;
  onChangeToken: TOnChangeToken;
};

const ChaosTokenAmounts: React.FC<TProps> = ({ token, onChangeToken }) => {
  const handleOneLessClick = () => {
    onChangeToken({
      name: token.icon,
      property: "amount",
      value: --token.amount,
    });
  };

  const handleOneMoreClick = () => {
    onChangeToken({
      name: token.icon,
      property: "amount",
      value: ++token.amount,
    });
  };

  return (
    <Container>
      <AntdButton
        disabled={token.amount === 0}
        icon={<MinusOutlined />}
        shape="circle"
        type="primary"
        onClick={handleOneLessClick}
      />
      <TokensContainer $amount={token.amount}>
        {Array.from(
          { length: token.amount !== 0 ? token.amount : 1 },
          (_, i) => (
            <TokenContainer
              key={i}
              $amount={token.amount}
              $opacity={token.amount === 0 ? 0.2 : 1}
            >
              {<Token name={token.icon} />}
            </TokenContainer>
          )
        )}
      </TokensContainer>
      <AntdButton
        disabled={token.amount === token.limit}
        icon={<PlusOutlined />}
        shape="circle"
        type="primary"
        onClick={handleOneMoreClick}
      />
    </Container>
  );
};

export { ChaosTokenAmounts };
