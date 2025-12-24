import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

interface AudienceSelectionSectionProps {
  onCompletionChange?: (completed: boolean) => void;
}

export function AudienceSelectionSection({
  onCompletionChange,
}: AudienceSelectionSectionProps) {
  const [mainAudience, setMainAudience] = useState("");
  const [reserveAudience, setReserveAudience] = useState("");

  useEffect(() => {
    const completed = mainAudience !== "";
    onCompletionChange?.(completed);
  }, [mainAudience, onCompletionChange]);

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
          <MeetingRoomIcon fontSize="small" />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} align="left">
            Выбор аудитории
          </Typography>
          <Typography variant="body2" color="text.secondary" align="left">
            Выберите подходящую аудиторию с учётом вместимости и оборудования
          </Typography>
        </Box>
      </Stack>

      {/* Поля выбора аудитории */}
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            required
            label="Основная аудитория"
            select
            size="small"
            value={mainAudience}
            onChange={(e) => setMainAudience(e.target.value)}
            placeholder="Выберите аудиторию"
            helperText="Аудитория, где планируется проведение мероприятия"
          >
            <MenuItem value="101">Аудитория 101</MenuItem>
            <MenuItem value="202">Аудитория 202</MenuItem>
            <MenuItem value="305">Аудитория 305</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Резервная аудитория"
            select
            size="small"
            value={reserveAudience}
            onChange={(e) => setReserveAudience(e.target.value)}
            helperText="На случай недоступности основной аудитории"
          >
            <MenuItem value="">Не требуется</MenuItem>
            <MenuItem value="102">Аудитория 102</MenuItem>
            <MenuItem value="204">Аудитория 204</MenuItem>
            <MenuItem value="306">Аудитория 306</MenuItem>
          </TextField>
        </Stack>
      </Stack>
    </Paper>
  );
}
