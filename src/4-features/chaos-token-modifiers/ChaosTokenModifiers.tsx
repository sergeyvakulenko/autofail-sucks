import { InputNumber } from "antd";
import React from "react";
import styled from "styled-components";
import { EDrawMoreMode, TOnChangeToken, TToken } from "~/5-entities/Token";
import FailIcon from "~/6-shared/icons/fail.png";
import OneMoreIcon from "~/6-shared/icons/plus-1.png";
import { IconButton } from "~/6-shared/ui-kit/IconButton";
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

const TokenContainer = styled.div<{ $amount: number; $opacity?: number }>`
  width: ${(props) => (props.$amount <= 5 ? "20px" : "10px")};
  opacity: ${(props) => (props.$opacity ? props.$opacity : 1)};
  display: flex;
`;

const ModifierContainer = styled.div`
  display: flex;
  height: 50px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
`;

const EffectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
`;

type TProps = {
  token: TToken;
  onChangeToken: TOnChangeToken;
};

const ChaosTokenModifiers: React.FC<TProps> = ({ token, onChangeToken }) => {
  const cannotDrawMore = token.drawMore === EDrawMoreMode.cannot;

  // Pointer is only used when you can click on it.
  // Cursor is unchanged if it's hidden (cannotDrawMore = true).
  // 0 - hidden
  // 0.4 - turned off
  // 1 - turned on
  const drawMoreStyles = {
    cursor: cannotDrawMore
      ? "auto"
      : ["bless", "curse", "frost"].includes(token.icon)
      ? "not-allowed"
      : "pointer",
    opacity: cannotDrawMore
      ? 0
      : !token.effects.includes("REVEAL_ANOTHER")
      ? 0.4
      : 1,
  };

  const handleDrawMoreClick = () => {
    // Do nothing if the token cannot draw one more.
    if (cannotDrawMore) {
      return;
    }

    // Do nothing for tokens who always draw one more.
    if (["bless", "curse", "frost"].includes(token.icon)) {
      return;
    }

    // Calculate updated effects of the token.
    const effects = token.effects.includes("REVEAL_ANOTHER")
      ? token.effects.filter((e) => e !== "REVEAL_ANOTHER")
      : token.effects.concat(["REVEAL_ANOTHER"]);

    // Update.
    onChangeToken({
      name: token.icon,
      property: "effects",
      value: effects,
    });
  };

  // You cannot turn off auto fail effect for auto fail token,
  // therefore it's not-allowed for auto fail token.
  // 0.4 - turned off
  // 1 - turned on
  const autoFailStyles = {
    cursor: token.icon === "tentacle" ? "not-allowed" : "pointer",
    opacity: !token.effects.includes("AUTO_LOSE") ? 0.4 : 1,
  };

  const handleAutoFailClick = () => {
    // Do nothing for tokens who always automatically fail.
    if (token.icon === "tentacle") {
      return;
    }

    // Calculate updated effects of the token.
    const effects = token.effects.includes("AUTO_LOSE")
      ? token.effects.filter((e) => e !== "AUTO_LOSE")
      : token.effects.concat(["AUTO_LOSE"]);

    // Update.
    onChangeToken({
      name: token.icon,
      property: "effects",
      value: effects,
    });
  };

  // Add "+" for positive modifiers.
  const handleModifierFormat = (value: number | string | undefined) => {
    if (!value) {
      return "";
    }

    if (typeof value === "string") {
      value = parseInt(value);
    }

    if (value > 0) {
      return `+${value}`;
    }

    return `${value}`;
  };

  const handleModifierChange = (value: string | number | null) => {
    onChangeToken({
      name: token.icon,
      property: "modifier",
      value: value || 0,
    });
  };

  return (
    <Container>
      <TokenContainer $amount={1} $opacity={1}>
        {<Token name={token.icon} />}
      </TokenContainer>
      <ModifierContainer>
        <InputNumber
          size="large"
          min={-1023}
          max={1024}
          defaultValue={token.modifier}
          formatter={handleModifierFormat}
          style={{
            opacity: token.modifierChangeable ? 1 : 0,
            paddingLeft: token.modifier === 0 ? "31px" : "27px",
          }}
          onChange={handleModifierChange}
        />
      </ModifierContainer>
      <EffectsContainer>
        <IconButton
          src={OneMoreIcon}
          alt={"draw-one-more"}
          style={drawMoreStyles}
          onClick={handleDrawMoreClick}
        />
        <IconButton
          src={FailIcon}
          alt={"auto-fail"}
          style={autoFailStyles}
          onClick={handleAutoFailClick}
        />
      </EffectsContainer>
    </Container>
  );
};

export { ChaosTokenModifiers };
