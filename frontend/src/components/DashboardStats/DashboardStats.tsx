import { Grid } from "@mui/material";
import { StatsCard } from "../StatsCard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import RebaseEditIcon from "@mui/icons-material/RebaseEdit";

export const DashboardStats = () => {
    return (
      
      <Grid container spacing={9}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            icon={<ApartmentIcon color="primary" />}
            value={24}
            label="Всего аудиторий"
            iconBg="#E3F2FD"
            change="+12%"
            changeColor="success"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            icon={<VerifiedRoundedIcon sx={{ color: "#4caf50" }} />}
            value={18}
            label="Доступные сейчас"
            iconBg="#E8F5E9"
            change="Активно"
            changeColor="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            icon={<EventAvailableIcon sx={{ color: "#ff9800" }} />}
            value={6}
            label="Забронированы"
            iconBg="#FFF3E0"
            change="Занято"
            changeColor="warning"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            icon={<RebaseEditIcon sx={{ color: "#9c27b0" }} />}
            value={156}
            label="Единиц оборудования"
            iconBg="#F3E5F5"
            change="Обновлено"
            changeColor="neutral"
          />
        </Grid>
      </Grid>
    );
}
