import * as React from "react";
import {
  Box,
  Card,
  Typography,
  Tabs,
  Tab,
  Grid,
  Stack,
  useTheme,
} from "@mui/material";

interface Room {
  id: number;
  number: string;
  status: "available" | "booked" | "maintenance";
}

interface Floor {
  floor: number;
  rooms: Room[];
}

interface Building {
  name: string;
  floors: Floor[];
}

const buildings: Building[] = [
  {
    name: "Корпус А",
    floors: [
      {
        floor: 3,
        rooms: [
          { id: 301, number: "301", status: "available" },
          { id: 302, number: "302", status: "available" },
          { id: 303, number: "303", status: "booked" },
        ],
      },
      {
        floor: 2,
        rooms: [
          { id: 201, number: "201", status: "available" },
          { id: 202, number: "202", status: "booked" },
          { id: 203, number: "203", status: "maintenance" },
          { id: 204, number: "204", status: "available" },
        ],
      },
      {
        floor: 1,
        rooms: [
          { id: 101, number: "101", status: "available" },
          { id: 102, number: "102", status: "booked" },
          { id: 103, number: "103", status: "available" },
          { id: 104, number: "104", status: "available" },
        ],
      },
    ],
  },
  {
    name: "Корпус B",
    floors: [
      {
        floor: 2,
        rooms: [
          { id: 201, number: "201", status: "booked" },
          { id: 202, number: "202", status: "available" },
          { id: 203, number: "203", status: "maintenance" },
        ],
      },
      {
        floor: 1,
        rooms: [
          { id: 101, number: "101", status: "available" },
          { id: 102, number: "102", status: "booked" },
          { id: 103, number: "103", status: "available" },
        ],
      },
    ],
  },
];

export const BuildingScheme: React.FC = () => {
  const theme = useTheme();
  const [tab, setTab] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const currentBuilding = buildings[tab];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "#E8F5E9"; // зеленый
      case "booked":
        return "#FFF3E0"; // оранжевый
      case "maintenance":
        return "#ECEFF1"; // серый
      default:
        return "#fafafa";
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 1,
        bgcolor: "white",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        Схема корпусов
      </Typography>

      {/* Вкладки для переключения между корпусами */}
      <Tabs
        value={tab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        {buildings.map((b, index) => (
          <Tab key={index} label={b.name} sx={{ textTransform: "none" }} />
        ))}
      </Tabs>

      {/* Содержимое текущего корпуса */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          {currentBuilding.floors.map((floor) => (
            <Box
              key={floor.floor}
              sx={{
                mb: 2,
                p: 2,
                border: `1px dashed ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.secondary"
                mb={1}
              >
                {floor.floor} этаж
              </Typography>
              <Grid container spacing={1}>
                {floor.rooms.map((room) => (
                  <Grid key={room.id} size="grow">
                    <Box
                      sx={{
                        width: 120,
                        bgcolor: getStatusColor(room.status),
                        py: 1,
                        borderRadius: 1,
                        fontSize: 14,
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      {room.number}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Grid>

        {/* Правая часть — легенда и статистика */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            mb={1}
            textAlign={"left"}
          >
            Легенда
          </Typography>
          <Stack spacing={1.2} mb={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: "#E8F5E9",
                  borderRadius: 0.5,
                }}
              />
              <Typography variant="body2">Доступна</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: "#FFF3E0",
                  borderRadius: 0.5,
                }}
              />
              <Typography variant="body2">Забронирована</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: "#ECEFF1",
                  borderRadius: 0.5,
                }}
              />
              <Typography variant="body2">На обслуживании</Typography>
            </Stack>
          </Stack>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            mb={1}
            textAlign={"left"}
          >
            Статистика по этажам
          </Typography>
          {currentBuilding.floors.map((f) => {
            const total = f.rooms.length;
            const available = f.rooms.filter(
              (r) => r.status === "available"
            ).length;
            return (
              <Typography
                key={f.floor}
                variant="body2"
                color="text.secondary"
                textAlign={"left"}
              >
                {f.floor} этаж — {available}/{total} доступно
              </Typography>
            );
          })}
        </Grid>
      </Grid>
    </Card>
  );
};
