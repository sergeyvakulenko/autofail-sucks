import { Button, ButtonProps } from "antd";
import React from "react";

type TAntdButtonProps = {
  disabled: boolean;
  icon: React.ReactNode;
  shape: ButtonProps["shape"];
  type: ButtonProps["type"];
  onClick: () => void;
};

const AntdButton: React.FC<TAntdButtonProps> = ({
  disabled,
  icon,
  type,
  shape,
  onClick,
}) => (
  <Button
    disabled={disabled}
    icon={icon}
    shape={shape}
    type={type}
    onClick={onClick}
  />
);

export { AntdButton };
