import { Paper, Stack, Button } from "@mui/material";

type BookingActionsProps = {
  onCreate: () => void;
  onPreview?: () => void;
  onDraft?: () => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  isEdit?: boolean;
};

export function BookingActions({
  onCreate,
  onPreview,
  onDraft,
  onCancel,
  isSubmitting,
  isEdit
}: BookingActionsProps) {
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
          disabled={isSubmitting}
          onClick={onCreate}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            py: 1.2,
          }}
        >
          {isEdit ? "Редактировать бронирование" : "Создать бронирование"}
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={onPreview}
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
          disabled={isSubmitting}
          onClick={onDraft}
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
          onClick={onCancel}
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
