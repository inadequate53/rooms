import { Box, Button, Container, Typography } from "@mui/material";
import { DashboardStats } from "@/components/DashboardStats/DashboardStats";
import { PageHeader } from "@/components/common/PageHeader";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import { BookingTable } from "@/components/DataGridCatalog";
import { QuickActions } from "@/components/QuickActions";
import { RecentChanges } from "@/components/RecentChanges";
import { Equipment } from "@/components/Equipment";
import { Footer } from "@/components/common/Footer";

type CatalogPageProps = {
  onCreateBooking: () => void;
  onEditBooking: (id: string) => void;
};

export default function CatalogPage({
  onCreateBooking,
  onEditBooking,
}: CatalogPageProps) {
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
          title="Каталог аудиторий"
          subtitle="Управляйте информацией об аудиториях, их оборудованием и местоположением"
          actions={
            <>
              <Button
                variant="text"
                startIcon={<FileDownloadIcon />}
                size="small"
                sx={{
                  borderRadius: 2,
                  bgcolor: "rgba(238, 237, 237, 1)",
                  color: "rgba(75, 75, 75, 1)",
                  textTransform: "none",
                }}
              >
                Экспорт JSON
              </Button>
              <Button
                variant="text"
                startIcon={<FileUploadIcon />}
                size="small"
                sx={{
                  borderRadius: 2,
                  bgcolor: "rgba(238, 237, 237, 1)",
                  color: "rgba(75, 75, 75, 1)",
                  textTransform: "none",
                }}
              >
                Импорт JSON
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
                sx={{ borderRadius: 2, textTransform: "none" }}
              >
                Добавить аудиторию
              </Button>
            </>
          }
        />

        <DashboardStats />

        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 1,
            p: 3,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            color="textPrimary"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Список бронирований
          </Typography>

          <BookingTable onEdit={onEditBooking} />
        </Box>

        <QuickActions
          onAddAuditorium={() => console.log("Добавить аудиторию")}
          onCreateBooking={onCreateBooking} // ✅ теперь создаём бронь реально
          onEditAuditorium={() => console.log("Массовое редактирование")}
        />

        <RecentChanges />
        <Equipment />
        <Footer />
      </Box>
    </Container>
  );
}
