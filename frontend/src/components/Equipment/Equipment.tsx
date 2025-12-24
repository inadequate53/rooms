import * as React from "react";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import ComputerIcon from "@mui/icons-material/Computer";
import MicIcon from "@mui/icons-material/Mic";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const Equipment: React.FC = () => {
  const theme = useTheme();

  const equipment = [
    {
      label: "Проекторы",
      count: 18,
      icon: <TvIcon sx={{ color: theme.palette.info.main }} />,
      bg: "#E3F2FD",
    },
    {
      label: "Компьютеры",
      count: 45,
      icon: <ComputerIcon sx={{ color: theme.palette.success.main }} />,
      bg: "#E8F5E9",
    },
    {
      label: "Интер. доски",
      count: 12,
      icon: <DashboardIcon sx={{ color: "#BA68C8" }} />,
      bg: "#F3E5F5",
    },
    {
      label: "Микрофоны",
      count: 24,
      icon: <MicIcon sx={{ color: theme.palette.warning.main }} />,
      bg: "#FFF3E0",
    },
    {
      label: "Камеры",
      count: 8,
      icon: <VideocamIcon sx={{ color: theme.palette.error.main }} />,
      bg: "#FFEBEE",
    },
    {
      label: "Кондиционеры",
      count: 16,
      icon: <AcUnitIcon sx={{ color: "#FFB300" }} />,
      bg: "#FFF8E1",
    },
  ];

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        color="text.primary"
        sx={{ mb: 2 }}
      >
        Обзор оборудования
      </Typography>

      <Grid container spacing={3}>
        {equipment.map((item, index) => (
          <Grid size={{xs: 6, sm: 4, md: 2}} key={index}>
            <Stack
              direction="column"
              alignItems="center"
              sx={{
                textAlign: "center",
              }}
            >
              {/* Иконка */}
              <Box
                sx={{
                  bgcolor: item.bg,
                  borderRadius: 2,
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </Box>

              {/* Число и подпись */}
              <Typography variant="h6" fontWeight={600} color="text.primary">
                {item.count}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ lineHeight: 1.3 }}
              >
                {item.label}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
