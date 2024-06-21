import React from "react";
import styled from "styled-components";
import { TToken } from "~/5-entities/Token";
import { Token } from "~/6-shared/ui-kit/Token";

const TokensContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 80%;
`;

const TokenContainer = styled.div`
  width: 20px;
`;

type TProps = {
  bag: Array<TToken>;
};

const CurrentBag: React.FC<TProps> = ({ bag }) => (
  <TokensContainer>
    {bag.map((t, i) =>
      Array.from({ length: t.amount }, (_, j) => (
        <TokenContainer key={`${i}_${j}`}>
          <Token name={t.icon} />
        </TokenContainer>
      )).map((t) => t)
    )}
  </TokensContainer>
);

export { CurrentBag };
