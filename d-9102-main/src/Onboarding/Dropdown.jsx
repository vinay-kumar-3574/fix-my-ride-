import React, { useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useColorScheme } from "@mui/material/styles";

export default function Dropdown(props) {
  const { mode, systemMode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMode = (targetMode) => () => {
    setMode(targetMode);
    handleClose();
  };

  if (!mode) {
    return (
      <Box
        sx={(theme) => ({
          verticalAlign: "bottom",
          display: "inline-flex",
          width: "2.25rem",
          height: "2.25rem",
          borderRadius: theme.shape.borderRadius,
          border: "1px solid",
          borderColor: theme.palette.divider,
        })}
      />
    );
  }

  const resolvedMode = systemMode || mode;
  const icon = resolvedMode === "light" ? <LightModeIcon /> : <DarkModeIcon />;

  return (
    <>
      <IconButton
        onClick={handleClick}
        disableRipple
        size="small"
        aria-controls={open ? "color-scheme-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        {...props}
      >
        {icon}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            variant: "outlined",
            elevation: 0,
            sx: { my: "4px" },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem selected={mode === "system"} onClick={handleMode("system")}>
          System
        </MenuItem>
        <MenuItem selected={mode === "light"} onClick={handleMode("light")}>
          Light
        </MenuItem>
        <MenuItem selected={mode === "dark"} onClick={handleMode("dark")}>
          Dark
        </MenuItem>
      </Menu>
    </>
  );
}
