import { Paper, Stack, Button } from "@mui/material";

export function BookingActions() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid rgba(230, 232, 236, 1)",
        boxShadow: 1,
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={1.5}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            py: 1.2,
          }}
        >
          Создать бронирование
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            py: 1.1,
          }}
        >
          Предварительный просмотр
        </Button>

        <Button
          variant="text"
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            py: 1,
          }}
        >
          Сохранить как черновик
        </Button>

        <Button
          variant="text"
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: 400,
            color: "text.secondary",
            borderRadius: 2,
            py: 1,
          }}
        >
          Отмена
        </Button>
      </Stack>
    </Paper>
  );
}
