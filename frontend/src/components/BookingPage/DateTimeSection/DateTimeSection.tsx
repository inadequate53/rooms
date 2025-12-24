import { useState, useEffect } from "react";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface DateTimeSectionProps {
  onCompletionChange?: (completed: boolean) => void;
}

export function DateTimeSection({ onCompletionChange }: DateTimeSectionProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const completed = !!startDate && !!endDate && !!startTime && !!endTime;
    onCompletionChange?.(completed);
  }, [startDate, endDate, startTime, endTime, onCompletionChange]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        boxShadow: 1,
        borderColor: "rgba(230, 232, 236, 1)",
        bgcolor: "background.paper",
      }}
    >
      {/* Заголовок карточки */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0, 26, 255, 0.82)",
            color: "rgba(253, 253, 253, 1)",
          }}
        >
          <AccessTimeIcon fontSize="small" />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} align="left">
            Дата и время проведения
          </Typography>
          <Typography variant="body2" color="text.secondary" align="left">
            Выберите, когда будет проходить мероприятие
          </Typography>
        </Box>
      </Stack>

      {/* Форма: 2 строки по 2 поля */}
      <Stack spacing={2}>
        {/* Дата начала / окончания */}
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Дата начала"
            type="date"
            size="small"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Дата окончания"
            type="date"
            size="small"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        {/* Время начала / окончания */}
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Время начала"
            type="time"
            size="small"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Время окончания"
            type="time"
            size="small"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
