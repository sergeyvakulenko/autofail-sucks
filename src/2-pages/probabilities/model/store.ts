import { useReducer } from "react";
import { EDrawMoreMode, TToken } from "~/5-entities/Token";

type TState = {
  bag: Array<TToken>;
};

type TAction = {
  type: "CHANGE_TOKEN";
  payload: {
    name: TToken["icon"];
    property: keyof TToken;
    value: number | string | TToken["effects"];
  };
};

const INITIAL_BAG: Array<TToken> = [
  {
    modifier: 1,
    modifierChangeable: false,
    effects: [],
    symbol: null,
    icon: "plus-1",
    amount: 1,
    limit: 3,
    drawMore: EDrawMoreMode.cannot,
  },
  {
    modifier: 0,
    modifierChangeable: false,
    effects: [],
    symbol: null,
    icon: "minus-0",
    amount: 2,
    limit: 4,
    drawMore: EDrawMoreMode.cannot,
  },
  {
    modifier: -1,
    modifierChangeable: false,
    effects: [],
    symbol: null,
    icon: "minus-1",
    amount: 3,
    limit: 5,
    drawMore: EDrawMoreMode.cannot,
  },
  {
    modifier: -2,
    modifierChangeable: false,
    effects: [],
    symbol: null,
    icon: "minus-2",
    amount: 2,
    limit: 4,
    drawMore: EDrawMoreMode.cannot,
  },
  {
    modifier: -3,
    modifierChangeable: false,
    effects: [],
    symbol: null,
    icon: "minus-3",
    amount: 1,
    limit: 3,
    drawMore: EDrawMoreMode.cannot,
  },
  {
    modifier: -4,
    modifierChangeable: false,
    effects: [],
    symbol: null,
    icon: "minus-4",
    amount: 1,
    limit: 2,
    drawMore: EDrawMoreMode.cannot,
  },
  {
    modifier: -5,
    modifierChangeable: false,
    effects: [],
    symbol: null,
    icon: "minus-5",
    amount: 0,
    limit: 2,
    drawMore: EDrawMoreMode.cannot,
  },
  {
    modifier: -6,
    modifierChangeable: false,
    effects: [],
    symbol: null,
    icon: "minus-6",
    amount: 0,
    limit: 1,
    drawMore: EDrawMoreMode.cannot,
  },
  {
    modifier: -7,
    modifierChangeable: false,
    effects: [],
    symbol: null,
    icon: "minus-7",
    amount: 0,
    limit: 1,
    drawMore: EDrawMoreMode.cannot,
  },
  {
    modifier: -8,
    modifierChangeable: false,
    effects: [],
    symbol: null,
    icon: "minus-8",
    amount: 0,
    limit: 1,
    drawMore: EDrawMoreMode.cannot,
  },
  {
    modifier: -1,
    modifierChangeable: true,
    effects: [],
    symbol: "SKULL",
    icon: "skull",
    amount: 1,
    limit: 4,
    drawMore: EDrawMoreMode.can,
  },
  {
    modifier: 0,
    modifierChangeable: true,
    effects: ["REVEAL_ANOTHER"],
    symbol: "CULTIST",
    icon: "cultist",
    amount: 1,
    limit: 4,
    drawMore: EDrawMoreMode.can,
  },
  {
    modifier: -3,
    modifierChangeable: true,
    effects: [],
    symbol: "TABLET",
    icon: "tablet",
    amount: 1,
    limit: 4,
    drawMore: EDrawMoreMode.can,
  },
  {
    modifier: -5,
    modifierChangeable: true,
    effects: [],
    symbol: "ELDER_THING",
    icon: "elder-thing",
    amount: 1,
    limit: 4,
    drawMore: EDrawMoreMode.can,
  },
  {
    modifier: 0,
    modifierChangeable: false,
    effects: ["AUTO_LOSE"],
    symbol: "TENTACLE",
    icon: "tentacle",
    amount: 1,
    limit: 1,
    drawMore: EDrawMoreMode.cannot,
  },
  {
    modifier: 0,
    modifierChangeable: true,
    effects: ["AUTO_WIN"],
    symbol: "ELDER_SIGN",
    icon: "elder-sign",
    amount: 1,
    limit: 1,
    drawMore: EDrawMoreMode.can,
  },
  {
    modifier: +2,
    modifierChangeable: false,
    effects: ["REVEAL_ANOTHER"],
    symbol: "BLESS",
    icon: "bless",
    amount: 0,
    limit: 10,
    drawMore: EDrawMoreMode.always,
  },
  {
    modifier: -2,
    modifierChangeable: false,
    effects: ["REVEAL_ANOTHER"],
    symbol: "CURSE",
    icon: "curse",
    amount: 0,
    limit: 10,
    drawMore: EDrawMoreMode.always,
  },
  {
    modifier: -1,
    modifierChangeable: false,
    effects: ["REVEAL_ANOTHER"],
    symbol: "FROST",
    icon: "frost",
    amount: 0,
    limit: 8,
    drawMore: EDrawMoreMode.always,
  },
];

function reducer(state: TState, action: TAction) {
  if (action.type === "CHANGE_TOKEN") {
    const { name, property, value } = action.payload;
    return {
      bag: [
        ...state.bag.map((token) => {
          if (token.icon === name) {
            return {
              ...token,
              [property]: value,
            };
          }

          return token;
        }),
      ],
    };
  }
  throw Error("Unknown action.");
}

const useProbabilitiesStore = () => {
  const [state, dispatch] = useReducer(reducer, { bag: INITIAL_BAG });
  const { bag } = state;

  const onChangeToken = (payload: TAction["payload"]) => {
    dispatch({
      type: "CHANGE_TOKEN",
      payload,
    });
  };

  return {
    bag,
    onChangeToken,
  };
};

export { useProbabilitiesStore };
