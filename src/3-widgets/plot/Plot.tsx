import React from "react";
import styled from "styled-components";
import { CurrentBag } from "~/4-features/current-bag";
import { Graph } from "~/4-features/graph";
import { useProbabilityCalculator } from "~/4-features/probability-calculator";
import { TToken } from "~/5-entities/Token";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type TProps = {
  bag: Array<TToken>;
};

const Plot: React.FC<TProps> = ({ bag }) => {
  const data = useProbabilityCalculator({ bag });

  return (
    <Container>
      <Graph data={data} />
      <CurrentBag bag={bag} />
    </Container>
  );
};

export { Plot };
