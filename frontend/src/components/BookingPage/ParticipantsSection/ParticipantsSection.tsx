import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface ParticipantsSectionProps {
  onCompletionChange?: (completed: boolean) => void;
}

export function ParticipantsSection({
  onCompletionChange,
}: ParticipantsSectionProps) {
  const { register, watch, setValue, getValues } = useFormContext<any>();

  const organizerName = watch("organizerName");
  const expectedCount = watch("expectedCount");
  const groups = watch("groups") as string[];

  useEffect(() => {
    const completed =
      (organizerName?.trim?.().length ?? 0) > 0 &&
      (expectedCount?.trim?.().length ?? 0) > 0;
    onCompletionChange?.(completed);
  }, [organizerName, expectedCount, onCompletionChange]);

  const handleAddGroup = () => {
    const input = (getValues("groupInput") as string)?.trim();
    if (!input) return;

    const current = (getValues("groups") as string[]) ?? [];
    setValue("groups", [...current, input], {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("groupInput", "", { shouldDirty: true });
  };

  const handleRemoveGroup = (index: number) => {
    const current = (getValues("groups") as string[]) ?? [];
    setValue(
      "groups",
      current.filter((_, i) => i !== index),
      { shouldDirty: true, shouldValidate: true }
    );
  };

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
          <GroupIcon fontSize="small" />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} align="left">
            Участники мероприятия
          </Typography>
          <Typography variant="body2" color="text.secondary" align="left">
            Укажите информацию об организаторе и участниках
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={3}>
        <Box>
          <Typography variant="body2" fontWeight={600} mb={1}>
            Организатор мероприятия
          </Typography>

          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                required
                label="ФИО организатора"
                size="small"
                {...register("organizerName")}
              />
              <TextField
                fullWidth
                label="Должность"
                size="small"
                {...register("organizerPosition")}
              />
            </Stack>
          </Stack>
        </Box>

        <Box>
          <Typography variant="body2" fontWeight={600} mb={1}>
            Информация об участниках
          </Typography>

          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                required
                label="Ожидаемое количество участников"
                size="small"
                type="number"
                {...register("expectedCount")}
              />

              <TextField
                fullWidth
                label="Тип участников"
                size="small"
                select
                defaultValue=""
                {...register("participantType")}
              >
                <MenuItem value="">—</MenuItem>
                <MenuItem value="students">Студенты</MenuItem>
                <MenuItem value="teachers">Преподаватели</MenuItem>
                <MenuItem value="guests">Гости</MenuItem>
                <MenuItem value="mixed">Смешанная группа</MenuItem>
              </TextField>
            </Stack>

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Группы / аудитории"
                placeholder="Например: М-101, И-201"
                size="small"
                {...register("groupInput")}
              />
              <IconButton
                onClick={handleAddGroup}
                sx={{
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "#fff",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>

            {groups?.length > 0 && (
              <Box
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid rgba(230, 232, 236, 1)",
                }}
              >
                {groups.map((group, index) => (
                  <Stack
                    key={`${group}-${index}`}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor:
                        index % 2 === 0
                          ? "rgba(248, 249, 252, 1)"
                          : "rgba(239, 246, 255, 1)",
                    }}
                  >
                    <Typography variant="body2">{group}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveGroup(index)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                ))}
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
