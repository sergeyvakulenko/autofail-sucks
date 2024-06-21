import React from "react";
import styled from "styled-components";
import BlessToken from "./tokens/bless.png";
import CultistToken from "./tokens/cultist.png";
import CurseToken from "./tokens/curse.png";
import ElderSignToken from "./tokens/elder-sign.png";
import ElderThingToken from "./tokens/elder-thing.png";
import FrostToken from "./tokens/frost.png";
import MinusZeroToken from "./tokens/minus-0.png";
import MinusOneToken from "./tokens/minus-1.png";
import MinusTwoToken from "./tokens/minus-2.png";
import MinusThreeToken from "./tokens/minus-3.png";
import MinusFourToken from "./tokens/minus-4.png";
import MinusFiveToken from "./tokens/minus-5.png";
import MinusSixToken from "./tokens/minus-6.png";
import MinusSevenToken from "./tokens/minus-7.png";
import MinusEightToken from "./tokens/minus-8.png";
import PlusOneToken from "./tokens/plus-1.png";
import SkullToken from "./tokens/skull.png";
import TabletToken from "./tokens/tablet.png";
import TentacleToken from "./tokens/tentacle.png";

const Img = styled.img`
  max-height: 50px;
  max-width: 50px;
`;

const TOKENS_MAP = {
  bless: BlessToken,
  cultist: CultistToken,
  curse: CurseToken,
  "elder-sign": ElderSignToken,
  "elder-thing": ElderThingToken,
  frost: FrostToken,
  "minus-0": MinusZeroToken,
  "minus-1": MinusOneToken,
  "minus-2": MinusTwoToken,
  "minus-3": MinusThreeToken,
  "minus-4": MinusFourToken,
  "minus-5": MinusFiveToken,
  "minus-6": MinusSixToken,
  "minus-7": MinusSevenToken,
  "minus-8": MinusEightToken,
  "plus-1": PlusOneToken,
  skull: SkullToken,
  tablet: TabletToken,
  tentacle: TentacleToken,
};

type TProps = {
  name: keyof typeof TOKENS_MAP;
};

const Token: React.FC<TProps> = ({ name }) => (
  <Img src={TOKENS_MAP[name]} alt={name} />
);

export { Token };
