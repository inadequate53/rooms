import { useEffect, useMemo, useState } from "react";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchBookings, type BookingDto } from "@/api/bookingsApi";

function formatFormat(v: BookingDto["format"]) {
  switch (v) {
    case "ONSITE":
      return "Очно";
    case "ONLINE":
      return "Онлайн";
    case "LABS":
      return "Смешанный";
    case "OTHER":
      return "Другой";
    default:
      return v;
  }
}

function toLocalDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export function BookingTable() {
  const [rows, setRows] = useState<BookingDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchBookings();
        if (mounted) setRows(data);
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
    console.log("Редактировать бронирование", id);
  };

  const handleDelete = (id: string) => {
    // пока локально убираем из таблицы (реальный DELETE сделаем позже)
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const columns: GridColDef<BookingDto>[] = useMemo(
    () => [
      {
        field: "title",
        headerName: "Мероприятие",
        width: 260,
      },
      {
        field: "eventType",
        headerName: "Тип",
        width: 140,
      },
      {
        field: "format",
        headerName: "Формат",
        width: 120,
        renderCell: (params) => (
          <Chip
            size="small"
            label={formatFormat(params.value)}
            variant="outlined"
          />
        ),
      },
      {
        field: "startsAt",
        headerName: "Начало",
        width: 180,
        valueGetter: (_value, row) => toLocalDateTime(row.startsAt),
      },
      {
        field: "endsAt",
        headerName: "Окончание",
        width: 180,
        valueGetter: (_value, row) => toLocalDateTime(row.endsAt),
      },
      {
        field: "mainAuditoriumName",
        headerName: "Осн. аудитория",
        width: 200,
      },
      {
        field: "reserveAuditoriumName",
        headerName: "Резерв",
        width: 200,
        valueGetter: (_value, row) => row.reserveAuditoriumName ?? "—",
      },
      {
        field: "organizerName",
        headerName: "Организатор",
        width: 220,
        valueGetter: (_value, row) =>
          row.organizerPosition
            ? `${row.organizerName} (${row.organizerPosition})`
            : row.organizerName,
      },
      {
        field: "expectedCount",
        headerName: "Участники",
        width: 150,
        valueGetter: (_value, row) =>
          row.expectedCount !== null ? `${row.expectedCount} чел.` : "—",
      },
      {
        field: "groups",
        headerName: "Группы",
        width: 280,
        sortable: false,
        renderCell: (params) => (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", p: 1 }}>
            {(params.value ?? []).length ? (
              (params.value as string[]).map((g) => (
                <Chip key={g} label={g} size="small" variant="outlined" />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                —
              </Typography>
            )}
          </Box>
        ),
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Действия",
        width: 120,
        getActions: (params) => [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Редактировать"
            onClick={() => handleEdit(params.id as string)}
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Удалить"
            onClick={() => handleDelete(params.id as string)}
            color="inherit"
          />,
        ],
      },
    ],
    []
  );

  if (loading) {
    return (
      <Box sx={{ p: 3, display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 520, width: "100%", bgcolor: "white", borderRadius: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        sx={{
          border: "none",
          "& .MuiDataGrid-cell": { outline: "none" },
        }}
      />
    </Box>
  );
}
