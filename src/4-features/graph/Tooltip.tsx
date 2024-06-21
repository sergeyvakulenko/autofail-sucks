import { Tooltip as AntdTooltip } from "antd";
import React from "react";
import { TPlotValue } from "~/5-entities/PlotValue";

type TProps = {
  payload?: Array<{ payload: TPlotValue }>;
  label?: string;
  active?: boolean;
};

const Tooltip: React.FC<TProps> = ({ payload, active }) => {
  const item = payload?.[0];
  if (item) {
    const probability =
      (Math.round(item.payload.probability * 10 ** 2) / 10 ** 2) * 100;

    const emoji =
      probability === 0
        ? "💀"
        : probability < 20
        ? "🤨"
        : probability < 40
        ? "🤔"
        : probability < 50
        ? "😐"
        : probability < 80
        ? "😌"
        : "🤠";

    if (active) {
      return (
        <AntdTooltip
          arrow={false}
          title={`${item.payload.diff > 0 ? "+" : ""}${
            item.payload.diff
          } ➡️ ${probability}% ${emoji}`}
          open
          placement="right"
        />
      );
    }
  }

  return null;
};

export { Tooltip };
