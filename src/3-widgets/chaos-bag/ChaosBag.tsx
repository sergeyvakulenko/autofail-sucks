import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { ChaosTokenAmounts } from "~/4-features/chaos-token-amounts/ChaosTokenAmounts";
import { ChaosTokenModifiers } from "~/4-features/chaos-token-modifiers/ChaosTokenModifiers";
import { TOnChangeToken, TToken } from "~/5-entities/Token";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

type TProps = {
  mode: "amo" | "mod";
  bag: Array<TToken>;
  onChangeToken: TOnChangeToken;
};

const ChaosBag: React.FC<TProps> = ({ mode, bag, onChangeToken }) => (
  <AnimatePresence custom={mode === "amo" ? 1 : -1} mode={"popLayout"}>
    {mode === "amo" && (
      <motion.div
        key="amo"
        custom={1}
        initial="enter"
        animate="center"
        exit="exit"
        variants={VARIANTS}
        transition={{ duration: 0.3 }}
      >
        <Container>
          {bag.map((token: TToken) => (
            <ChaosTokenAmounts
              key={token.icon}
              token={token}
              onChangeToken={onChangeToken}
            />
          ))}
        </Container>
      </motion.div>
    )}
    {mode === "mod" && (
      <motion.div
        key="mod"
        custom={-1}
        initial="enter"
        animate="center"
        exit="exit"
        variants={VARIANTS}
        transition={{ duration: 0.3 }}
      >
        <Container>
          {bag.map((token: TToken, i: number) =>
            i > 9 ? (
              <ChaosTokenModifiers
                key={token.icon}
                token={token}
                onChangeToken={onChangeToken}
              />
            ) : null
          )}
        </Container>
      </motion.div>
    )}
  </AnimatePresence>
);

export { ChaosBag };
