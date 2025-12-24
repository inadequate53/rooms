import * as React from "react";
import {
  Box,
  Grid as Grid,
  Stack,
  Typography,
  ButtonBase,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";

export interface QuickActionsProps {
  onAddAuditorium?: () => void;
  onCreateBooking?: () => void;
  onEditAuditorium?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAddAuditorium,
  onCreateBooking,
  onEditAuditorium,
}) => {
  const theme = useTheme();

  const actions = [
    {
      label: "Добавить аудиторию",
      description: "Создать новую аудиторию",
      icon: <AddIcon sx={{ color: theme.palette.primary.main }} />,
      bg: "#E3F2FD",
      onClick: onAddAuditorium,
    },
    {
      label: "Создать бронирование",
      description: "Забронировать аудиторию",
      icon: <EventIcon sx={{ color: theme.palette.success.main }} />,
      bg: "#E8F5E9",
      onClick: onCreateBooking,
    },
    {
      label: "Массовое редактирование",
      description: "Изменить несколько аудиторий",
      icon: <EditIcon sx={{ color: theme.palette.warning.main }} />,
      bg: "#FFF3E0",
      onClick: onEditAuditorium,
    },
  ];

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        color="text.primary"
        sx={{ mb: 2, textAlign: "center" }}
      >
        Быстрые действия
      </Typography>

      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid key={index} size={{xs: 12, sm: 6, md: 4}}>
            <ButtonBase
              onClick={action.onClick}
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                textAlign: "left",
                p: 2,
                borderRadius: 3,
                transition: "all 0.2s",
                border: "1px solid",
                borderColor: theme.palette.divider,
                bgcolor: "background.paper",
                "&:hover": {
                  boxShadow: 3,
                  transform: "translateY(-1px)",
                  bgcolor: "#fafafa",
                },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    bgcolor: action.bg,
                    borderRadius: 2,
                    width: 42,
                    height: 42,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {action.icon}
                </Box>

                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="text.primary"
                  >
                    {action.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.3 }}
                  >
                    {action.description}
                  </Typography>
                </Box>
              </Stack>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};