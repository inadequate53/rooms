import { Box, Button, Container } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

export default function SettingPage() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "#f9f9fb",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1350px",
          px: 3,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <PageHeader
          title="Управление бронированием"
          subtitle="Создавайте, изменяйте и отслеживайте бронирования аудиторий"
          actions={
            <>
              <Button
                variant="text"
                startIcon={<SaveIcon />}
                size="small"
                sx={{
                  borderRadius: 2,
                  bgcolor: "rgba(238, 237, 237, 1)",
                  color: "rgba(75, 75, 75, 1)",
                  textTransform: "none",
                }}
              >
                Сохранить как черновик
              </Button>
              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                size="small"
                sx={{
                  borderRadius: 2,
                  bgcolor: "rgba(238, 237, 237, 1)",
                  color: "rgba(75, 75, 75, 1)",
                  textTransform: "none",
                }}
              >
                Назад к списку
              </Button>
            </>
          }
        />
      </Box>
    </Container>
  );
}
