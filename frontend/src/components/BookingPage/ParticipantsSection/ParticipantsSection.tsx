import { useState, useEffect } from "react";
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
  const [organizerName, setOrganizerName] = useState("");
  const [organizerPosition, setOrganizerPosition] = useState("");
  const [expectedCount, setExpectedCount] = useState("");
  const [participantType, setParticipantType] = useState("");
  const [groupInput, setGroupInput] = useState("");
  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    const completed =
      organizerName.trim().length > 0 && expectedCount.trim().length > 0;
    onCompletionChange?.(completed);
  }, [organizerName, expectedCount, onCompletionChange]);

  const handleAddGroup = () => {
    if (!groupInput.trim()) return;
    setGroups((prev) => [...prev, groupInput.trim()]);
    setGroupInput("");
  };

  const handleRemoveGroup = (index: number) => {
    setGroups((prev) => prev.filter((_, i) => i !== index));
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
        {/* Блок: Организатор мероприятия */}
        <Box>
          <Typography
            variant="body2"
            fontWeight={600}
            mb={1}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            Организатор мероприятия
          </Typography>

          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                required
                label="ФИО организатора"
                size="small"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Должность"
                size="small"
                value={organizerPosition}
                onChange={(e) => setOrganizerPosition(e.target.value)}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Блок: Информация об участниках */}
        <Box>
          <Typography
            variant="body2"
            fontWeight={600}
            mb={1}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            Информация об участниках
          </Typography>

          <Stack spacing={2}>
            {/* Ожидаемое количество + тип участников */}
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                required
                label="Ожидаемое количество участников"
                size="small"
                type="number"
                value={expectedCount}
                onChange={(e) => setExpectedCount(e.target.value)}
              />
              <TextField
                fullWidth
                label="Тип участников"
                size="small"
                select
                value={participantType}
                onChange={(e) => setParticipantType(e.target.value)}
              >
                <MenuItem value="students">Студенты</MenuItem>
                <MenuItem value="teachers">Преподаватели</MenuItem>
                <MenuItem value="guests">Гости</MenuItem>
                <MenuItem value="mixed">Смешанная группа</MenuItem>
              </TextField>
            </Stack>

            {/* Группы/аудитории + кнопка добавления */}
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Группы / аудитории"
                placeholder="Например: М-101, И-201"
                size="small"
                value={groupInput}
                onChange={(e) => setGroupInput(e.target.value)}
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

            {/* Список добавленных групп */}
            {groups.length > 0 && (
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
                    key={index}
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
