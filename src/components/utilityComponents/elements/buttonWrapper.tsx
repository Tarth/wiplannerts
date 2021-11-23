import React, { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";

interface Prop {
  caption: string;
  variant: "contained" | "outlined" | "text";
  onClick: () => void;
  color?: "primary" | "secondary" | "default" | "inherit";
  className?: string;
  startIcon?: React.ReactNode;
}
export const ButtonWrapper: React.FC<Prop> = ({
  onClick,
  caption,
  variant,
  color = "default",
  className,
  startIcon,
}) => {
  const [loading, setLoading] = useState(false);

  async function Click() {
    try {
      setLoading(true);
      await onClick();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      className={className}
      onClick={Click}
      variant={variant}
      color={color}
      disabled={loading ? true : false}
      startIcon={startIcon}
    >
      {loading ? <CircularProgress size="1.5em"></CircularProgress> : caption}
    </Button>
  );
};
