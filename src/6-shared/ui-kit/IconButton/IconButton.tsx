import React from "react";
import styled from "styled-components";

const Img = styled.img`
  max-height: 32px;
  max-width: 32px;
`;

type TIconButtonProps = {
  src: string;
  alt: string;
  style: React.CSSProperties;
  onClick: () => void;
};

const IconButton: React.FC<TIconButtonProps> = ({
  src,
  alt,
  style,
  onClick,
}) => <Img src={src} alt={alt} style={style} onClick={onClick} />;

export { IconButton };
