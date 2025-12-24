import { Box, Typography, useTheme, Link, Stack, Grid } from "@mui/material" 
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import LockIcon from "@mui/icons-material/Lock";

export interface RecentChange{
    icon: React.ReactNode;
    text: string;
    time: string;
    color: string;
}

export const RecentChanges: React.FC = () => {
    const theme = useTheme();
    const changes: RecentChange[] = [
      {
        icon: <AddIcon sx={{ color: theme.palette.success.main }} />,
        color: "#E8F5E9",
        text: "Добавлена аудитория 301",
        time: "2 часа назад",
      },
      {
        icon: <UpdateIcon sx={{ color: theme.palette.info.main }} />,
        color: "#E3F2FD",
        text: "Обновлено оборудование в аудитории 201",
        time: "4 часа назад",
      },
      {
        icon: <LockIcon sx={{ color: theme.palette.warning.main }} />,
        color: "#FFF3E0",
        text: "Создано бронирование для аудитории 101",
        time: "5 часов назад",
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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h5"
          fontWeight={600}
          color="text.primary"
          sx={{ mb: 2 }}
        >
          Последние изменения
        </Typography>
        <Link
          href="#"
          underline="hover"
          sx={{ fontsize: 14, color: theme.palette.primary.main, mb: 2 }}
        >
          Показать всё
        </Link>
      </Stack>

      <Grid container spacing={2}>
        {changes.map((change, index) => (
          <Grid size={{xs: 12}} key={index}>
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Иконка */}
              <Box
                sx={{
                  bgcolor: change.color,
                  borderRadius: 5,
                  width: 42,
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {change.icon}
              </Box>

              {/* Текст */}
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  color="text.primary"
                >
                  {change.text}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                  {change.time}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
