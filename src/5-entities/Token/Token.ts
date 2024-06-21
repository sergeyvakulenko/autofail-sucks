type TEffect = "REVEAL_ANOTHER" | "AUTO_LOSE" | "AUTO_WIN";

type TIcon =
  | "bless"
  | "cultist"
  | "curse"
  | "elder-sign"
  | "elder-thing"
  | "frost"
  | "minus-0"
  | "minus-1"
  | "minus-2"
  | "minus-3"
  | "minus-4"
  | "minus-5"
  | "minus-6"
  | "minus-7"
  | "minus-8"
  | "plus-1"
  | "skull"
  | "tablet"
  | "tentacle";

type TSymbol =
  | "SKULL"
  | "CULTIST"
  | "TABLET"
  | "ELDER_THING"
  | "TENTACLE"
  | "ELDER_SIGN"
  | "BLESS"
  | "CURSE"
  | "FROST"
  | null;

export enum EDrawMoreMode {
  cannot,
  can,
  always,
}

export type TToken = {
  amount: number;
  drawMore: EDrawMoreMode;
  effects: Array<TEffect>;
  icon: TIcon;
  limit: number;
  modifier: number;
  modifierChangeable: boolean;
  symbol: TSymbol;
};

export type TOnChangeToken = (payload: {
  name: TToken["icon"];
  property: keyof TToken;
  value: number | string | TToken["effects"];
}) => void;
