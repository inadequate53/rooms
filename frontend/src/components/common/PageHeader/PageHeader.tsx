import { Box, Typography, Stack} from "@mui/material";
import { type ReactNode } from "react";

export interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{}}
    >
      <Box>
        <Typography
          variant="h5"
          fontWeight={600}
          color="text.primary"
          sx={{
            textAlign: "left",
          }}     
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Правая часть (например кнопки) */}
      {actions && (
        <Stack direction="row" spacing={1}>
          {actions}
        </Stack>
      )}
    </Stack>
  );
}