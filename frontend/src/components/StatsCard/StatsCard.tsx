import React from "react";
import { Card, Box, Typography, Chip } from "@mui/material";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

type StatsCardProps = {
  icon?: React.ReactNode;
  value: number | string;
  label: string;
  iconBg: string;
  change?: string;
  changeColor?: "success" | "neutral" | "warning";
  sx?: SxProps<Theme>;
};

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  value,
  label,
  iconBg,
  change,
  changeColor = "success",
  sx,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        p: 2,
        width: 250,
        height: 110,
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "translateY(-2px)"},
        ...sx,
      }}
    >
      {/* Верхняя часть карточки */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            sx={{
              bgcolor: iconBg,
              borderRadius: 2,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 20,
            }}
          >
            {icon}
          </Box>
          {change && (
            <Chip
              label={change}
              size="small"
              sx={{
                fontWeight: 500,
                fontSize: "0.75rem",
                height: 22,
                bgcolor:
                  changeColor === "success"
                    ? "rgba(76, 175, 80, 0.1)"
                    : changeColor === "warning"
                    ? "rgba(255, 152, 0, 0.1)"
                    : "rgba(158, 158, 158, 0.1)",
                color:
                  changeColor === "success"
                    ? "success.main"
                    : changeColor === "warning"
                    ? "warning.main"
                    : "text.secondary",
              }}
            />
          )}
        </Box>

        {/* Нижняя часть карточки */}
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="h5" fontWeight={600} sx={{lineHeight: 1}}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
    </Card>
  );
};
