import { useEffect, useState } from "react";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchRooms, type RoomDto } from "@/api/roomsApi";

export function AuditoriumTable() {
  const [rows, setRows] = useState<RoomDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchRooms(1);
        if (mounted) setRows(data.items);
      } catch (e) {
        if (mounted) setError((e as Error).message || "Ошибка загрузки данных");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleEdit = (id: string) => {
    console.log("Редактировать аудиторию", id);
  };

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const columns: GridColDef<RoomDto>[] = [
    { field: "code", headerName: "Номер аудитории", width: 120 },
    {
      field: "name",
      headerName: "Название аудитории",
      width: 280,
      editable: false,
    },
    {
      field: "capacity",
      headerName: "Вместимость",
      width: 200,
      editable: false,
      valueGetter: (value, row) => `${row.capacity} чел.`,
    },
    {
      field: "equipment",
      headerName: "Оборудование",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", p: 1  }}>
          {params.value.map((eq: string) => (
            <Chip key={eq} label={eq} size="small" variant="outlined" />
          ))}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Статус",
      width: 210,
      renderCell: (params) => {
        let color: "success" | "warning" | "default" = "default";
        let label = "";

        switch (params.value) {
          case "available":
            color = "success";
            label = "Доступна";
            break;
          case "booked":
            color = "warning";
            label = "Забронирована";
            break;
          case "maintenance":
            color = "default";
            label = "На обслуживании";
            break;
        }

        return (
          <Chip
            label={label}
            color={color}
            size="small"
            variant={params.value === "maintenance" ? "outlined" : "filled"}
          />
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Действия",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Редактировать"
          onClick={() => handleEdit(params.id as string)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Удалить"
          onClick={() => handleDelete(params.id as string)}
          color="inherit"
        />,
      ],
    },
  ];

  // === Состояния ===
  if (loading)
    return (
      <Box sx={{ p: 3, display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  // === Основная таблица ===
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        bgcolor: "white",
        borderRadius: 2,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id} // важно: id у нас строка
        checkboxSelection
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          border: "none",
          "& .MuiDataGrid-cell": { outline: "none" },
        }}
      />
    </Box>
  );
}
