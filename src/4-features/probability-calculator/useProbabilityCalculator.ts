import { TPlotValue } from "~/5-entities/PlotValue";
import { TToken } from "~/5-entities/Token";

type TProps = {
  bag: Array<TToken>;
};

// TODO: Not a hook, refactor to a module.
const useProbabilityCalculator = ({ bag }: TProps): Array<TPlotValue> => {
  const cache: { [key: string]: number } = {}; //TODO: type properly

  // Bag stores token types and an amount of
  // such tokens in each "token type" record.
  // We need to convert it to the array
  // with each token in the bag no matter what the type is.
  const tokens = bag.flatMap((token) => {
    const res = [];
    for (let i = 0; i < token.amount; i++) {
      res.push({
        ...token,
        id: `${token.symbol}_${i + 1}`,
      });
    }
    return res;
  });

  const generateVariations = (tokens: Array<TToken>) => {
    const n = tokens.length;
    const variations = [];

    // Loop over all possible subsets.
    for (let i = 0; i < 1 << n; i++) {
      // Loop from 1 to 2^n (including the empty subset).
      const variation = [];

      // Check each bit in the integer i.
      for (let j = 0; j < n; j++) {
        if (i & (1 << j)) {
          // If the j-th bit of i is set.
          variation.push(tokens[j]);
        }
      }

      variations.push(variation);
    }

    return variations;
  };

  const calculateSuccessProbability = (
    A: number,
    Z: number,
    tokens: TToken[]
  ): number => {
    // Store all tokens that cause success in the current conditions.
    const wins = tokens.reduce((acc, token) => {
      if (A - Z + token.modifier >= 0 && !token.effects.includes("AUTO_LOSE")) {
        acc.push(token);
      }
      return acc;
    }, [] as TToken[]);

    // Probability of drawing a "successful" token.
    return wins.length / tokens.length;
  };

  const calculateExactWinProbability = (
    A: number,
    Z: number,
    tokens: TToken[]
  ): number => {
    const Pwin: Array<number> = [];

    // First we divide all tokens into ones that draw more
    // and ones who behave like normal tokens.
    // I called them "flats" and "draws".
    const { flats, draws } = tokens.reduce(
      (acc, t) => {
        if (t.effects.includes("REVEAL_ANOTHER")) {
          acc.draws.push(t);
        } else {
          acc.flats.push(t);
        }
        return acc;
      },
      { flats: [] as Array<TToken>, draws: [] as Array<TToken> }
    );

    // Then we take all "draws" and generate all possible variations
    // of the "I take the full bag and draw a token" event.
    // For example, if we have 3 tokens with "draw more" effect
    // (let's assume their names are 1, 2, and 3)
    // those variations will be:
    // [] — we drew a "flat" token right away;
    // [1] — we drew a "draw" token #1, then a "flat" token;
    // [2] — we drew a "draw" token #2, then a "flat" token;
    // [3] — we drew a "draw" token #3, then a "flat" token;
    // [1, 2] — we drew a "draw" token #1, then #2, then a "flat" token;
    // [2, 3] — we drew a "draw" token #2, then #3, then a "flat" token;
    // [1, 3] — we drew a "draw" token #1, then #3, then a "flat" token;
    // [1, 2, 3] — we drew a "draw" token #1, then #2, then #3, and finally a "flat" token.
    const drawsVariations = generateVariations(draws);

    // TODO: optimize the algorithm or introduce paralleljs
    // For each of those variations we calculate the probability formula:
    drawsVariations.forEach((variation) => {
      const P: number[] = [];
      const drawsDrawn: TToken[] = [];

      // Cumulative cases (draw more tokens)
      let i = 0;
      while (i < variation.length) {
        // Draw token (to later use it's modifier)
        drawsDrawn.push(variation[i]);

        // Probability of drawing it equals the number of draw tokens
        // in the current variation that are yet to be drawn
        // divided by the amount of tokens in the bag at the moment.
        P.push((variation.length - i) / (tokens.length - i));

        // Next!
        i++;
      }

      // For two bless tokens and one cultist it would be BLESSBLESSCULTIST.
      const cacheKey = drawsDrawn
        .map((token) => token.symbol)
        .sort()
        .reduce((acc, token) => acc + token, "");

      // Here we calculate a sum of modifiers of all
      // "draw" tokens in the current variation.
      // We will adjust our skill value to this.
      // Store if not stored yet...
      if (!cache.hasOwnProperty(cacheKey)) {
        cache[cacheKey] = drawsDrawn.reduce(
          (acc, token) => acc + token.modifier,
          0
        );
      }

      // ...and use.
      const drawnModifiersSum = cache[cacheKey];

      // Base case (flat token)
      P.push(
        // Probability to draw the flat token in the current conditions
        // equals "amount of flat tokens" divided by "amount of tokens in the bag"
        // (we might've drawn some already).
        (flats.length / (tokens.length - drawsDrawn.length)) *
          // Probability that that token will be successful
          // We adjust it for the sum of modifiers of tokens already drawn!
          calculateSuccessProbability(A + drawnModifiersSum, Z, flats)
      );

      // Account for auto-lose effects of "draw more" tokens
      if (
        // Any of the "draw more" tokens has auto-lose effect....
        drawsDrawn.some((token) => token.effects.includes("AUTO_LOSE")) ||
        // ...or there were drawn 2 or more frost tokens.
        drawsDrawn.filter((token) => token.icon === "frost").length >= 2
      ) {
        // If this happens, we add 0 to the list of multipliers,
        // because propability of succes in this case is 0.
        P.push(0);
      }

      // Here we store the final probability of the variation
      // We multiply all its parts because it's a logical AND.
      Pwin.push(P.reduce((acc, item) => acc * item, 1));
    });

    // And here we add probabilities of all possible variations
    // (because it's a logical OR), receiving a final probability
    // of success.
    return Pwin.reduce((acc, i) => acc + i, 0);
  };

  const res = [];
  // We calculate success probability for the following skill value variations:
  // from "1 against 3" to "9 against 3".
  for (let i = 1; i < 10; i++) {
    res.push({
      diff: i - 3,
      probability: calculateExactWinProbability(i, 3, tokens),
    });
  }

  return res;
};

export { useProbabilityCalculator };
