import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";

interface MainInfoSectionProps {
  onCompletionChange?: (completed: boolean) => void;
}

export function MainInfoSection({ onCompletionChange }: MainInfoSectionProps) {
  const { register, watch } = useFormContext<any>();
  const title = watch("title");
  const eventType = watch("eventType");

  useEffect(() => {
    const completed = (title?.trim?.().length ?? 0) > 0 && !!eventType;
    onCompletionChange?.(completed);
  }, [title, eventType, onCompletionChange]);

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
          <EventNoteIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} align="left">
            Основная информация о мероприятии
          </Typography>
          <Typography variant="body2" color="text.secondary" align="left">
            Укажите детали мероприятия и тип занятия
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            required
            label="Название мероприятия"
            size="small"
            helperText="Например: Лекция по высшей математике"
            {...register("title")}
          />

          <TextField
            fullWidth
            required
            label="Тип мероприятия"
            size="small"
            select
            defaultValue="lecture"
            {...register("eventType")}
          >
            <MenuItem value="lecture">Лекция</MenuItem>
            <MenuItem value="seminar">Семинар</MenuItem>
            <MenuItem value="lab">Лабораторная работа</MenuItem>
            <MenuItem value="other">Другое</MenuItem>
          </TextField>
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Предмет/дисциплина"
            placeholder="Например: Высшая математика"
            size="small"
            helperText="Название учебной дисциплины или предмета"
            {...register("subject")}
          />

          <TextField
            fullWidth
            label="Формат проведения"
            size="small"
            select
            defaultValue="offline"
            {...register("format")}
          >
            <MenuItem value="offline">Очно</MenuItem>
            <MenuItem value="online">Дистанционно</MenuItem>
            <MenuItem value="hybrid">Гибридный формат</MenuItem>
          </TextField>
        </Stack>

        <TextField
          fullWidth
          label="Описание мероприятия"
          multiline
          minRows={4}
          placeholder="Подробное описание мероприятия, цели, особенности проведения..."
          helperText="Дополнительная информация о содержании и целях мероприятия"
          {...register("description")}
        />
      </Stack>
    </Paper>
  );
}
