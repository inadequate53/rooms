import { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import type { AuditoriumDto } from "@/api/auditoriumsApi";

interface AudienceSelectionSectionProps {
  onCompletionChange?: (completed: boolean) => void;
  auditoriums: AuditoriumDto[];
}

export function AudienceSelectionSection({
  onCompletionChange,
  auditoriums,
}: AudienceSelectionSectionProps) {
  const { control, watch } = useFormContext<any>();
  const mainAuditoriumId = watch("mainAuditoriumId");

  useEffect(() => {
    onCompletionChange?.(!!mainAuditoriumId);
  }, [mainAuditoriumId, onCompletionChange]);

  return (
    <Paper
      elevation={0}
      sx={{ p: 3, borderRadius: 3, border: "1px solid", boxShadow: 1 }}
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
          <MeetingRoomIcon fontSize="small" />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Выбор аудитории
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Выберите подходящую аудиторию
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Controller
            name="mainAuditoriumId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                required
                select
                size="small"
                label="Основная аудитория"
                helperText="Аудитория, где планируется мероприятие"
              >
                <MenuItem value="">—</MenuItem>
                {auditoriums.map((a) => (
                  <MenuItem key={a.id} value={a.id}>
                    {a.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="reserveAuditoriumId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                size="small"
                label="Резервная аудитория"
                helperText="На случай недоступности основной"
              >
                <MenuItem value="">—</MenuItem>
                {auditoriums.map((a) => (
                  <MenuItem key={a.id} value={a.id}>
                    {a.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
