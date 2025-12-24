// BookingSummary.tsx
import { Box, Paper, Stack, Typography } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";

export interface BookingSummaryProps {
  eventName?: string;
  room?: string;
  dateTime?: string;
  organizer?: string;
  participants?: string;
}

export function BookingSummary({
  eventName,
  room,
  dateTime,
  organizer,
  participants,
}: BookingSummaryProps) {
  const items = [
    {
      label: "Мероприятие",
      value: eventName || "Не указано",
      icon: <EventNoteIcon fontSize="small" />,
      bgcolor: "rgba(53, 127, 247, 0.12)",
    },
    {
      label: "Аудитория",
      value: room || "Не выбрана",
      icon: <MeetingRoomIcon fontSize="small" />,
      bgcolor: "rgba(26, 255, 179, 0.19)",
    },
    {
      label: "Дата и время",
      value: dateTime || "Не указаны",
      icon: <AccessTimeIcon fontSize="small" />,
      bgcolor: "rgba(244, 114, 181, 0.25)",
    },
    {
      label: "Организатор",
      value: organizer || "Не указан",
      icon: <PersonIcon fontSize="small" />,
      bgcolor: "rgba(251, 191, 36, 0.10)",
    },
    {
      label: "Участники",
      value: participants || "Не указано количество",
      icon: <GroupIcon fontSize="small" />,
      bgcolor: "rgba(248, 113, 113, 0.19)",
    },
  ];

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
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Сводка бронирования
      </Typography>

      <Stack spacing={1.5}>
        {items.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              bgcolor: item.bgcolor,
              px: 1.5,
              py: 1,
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1.5,
                bgcolor: "white",
              }}
            >
              {item.icon}
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.3 }}>
                {item.label}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ lineHeight: 1.4 }}
              >
                {item.value}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
