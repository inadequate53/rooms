import * as React from "react";
import { Box, Stack, Typography, Button, useTheme } from "@mui/material";

export const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 3,
        mt: 3,
        bgcolor: "#1E5EFF", // яркий синий как на скриншоте
        borderRadius: 3,
        color: "white",
        boxShadow: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {/* Левая часть */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{textAlign: "left"}}>
          Нужна помощь?
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Ознакомьтесь с документацией или свяжитесь с поддержкой
        </Typography>
      </Box>

      {/* Правая часть — кнопки */}
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: theme.palette.primary.main,
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#f3f4f6",
            },
          }}
        >
          Документация
        </Button>

        <Button
          variant="text"
          sx={{
            color: "white",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Связаться с поддержкой
        </Button>
      </Stack>
    </Box>
  );
};
