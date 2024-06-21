import { Drawer, FloatButton, Space, Switch } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { ChaosBag } from "~/3-widgets/chaos-bag/ChaosBag";
import { Plot } from "~/3-widgets/plot";
import BagIcon from "~/6-shared/icons/bag.svg?react";
import FailIcon from "~/6-shared/icons/fail.png";
import { useProbabilitiesStore } from "./model/store";

const PageTitleContainer = styled.div`
  text-align: center;
  font-size: 32px;
`;

const FailIconImg = styled.img`
  height: 32px;
  position: relative;
  top: 3px;
`;

const Probabilities = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"amo" | "mod">("amo");
  const { bag, onChangeToken } = useProbabilitiesStore();

  return (
    <Space direction="vertical">
      <PageTitleContainer>
        5️⃣❌3️⃣🕵🏻‍♂️👍💰
        <FailIconImg src={FailIcon} alt="auto-fail" />
        🤬💩
      </PageTitleContainer>
      <Plot bag={bag} />
      <FloatButton
        style={{ backgroundColor: "#7554AB" }}
        type="primary"
        icon={<BagIcon style={{ marginLeft: "-1px", marginTop: "2px" }} />}
        onClick={() => setOpen(true)}
      />
      <Drawer
        extra={
          <Switch
            onChange={(checked) => {
              setMode(checked ? "mod" : "amo");
            }}
          />
        }
        open={open}
        style={{ overflow: "hidden", position: "relative" }}
        onClose={() => setOpen(false)}
      >
        <ChaosBag mode={mode} bag={bag} onChangeToken={onChangeToken} />
      </Drawer>
    </Space>
  );
};

export { Probabilities };
