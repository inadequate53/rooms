import { Box, Paper, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

export interface StatusItem {
  label: string;
  status: "success" | "warning" | "error" | "info";
}

interface BookingStatusProps {
  items: StatusItem[];
}

export function BookingStatus({ items }: BookingStatusProps) {
  const getIcon = (status: StatusItem["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircleIcon color="success" fontSize="small" />;
      case "warning":
        return <WarningIcon color="warning" fontSize="small" />;
      case "error":
        return <ErrorIcon color="error" fontSize="small" />;
      case "info":
      default:
        return <InfoIcon color="info" fontSize="small" />;
    }
  };

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
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Статус заполнения
      </Typography>

      <Stack spacing={1.5}>
        {items.map((item) => (
          <Stack
            key={item.label}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              p: 1.2,
              borderRadius: 2,
              bgcolor: "rgba(248, 249, 252, 0.6)",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {item.label}
            </Typography>

            <Box>{getIcon(item.status)}</Box>
          </Stack>
        ))}
      </Stack>

      {/* Жёлтая подсказка внизу */}
      <Box
        sx={{
          mt: 2,
          p: 1.5,
          borderRadius: 2,
          bgcolor: "rgba(253, 245, 208, 1)",
          border: "1px solid rgba(250, 204, 21, 0.5)",
        }}
      >
        <Typography variant="body2" fontWeight={500} color="warning.main">
          Заполните обязательные поля
        </Typography>
      </Box>
    </Paper>
  );
}
