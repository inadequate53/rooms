import { Box, Button, Container, Stack, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { MainInfoSection } from "@/components/BookingPage/MainInfoSection/MainInfoSection";
import { BookingSummary } from "@/components/BookingPage/BookingSummary";
import { DateTimeSection } from "@/components/BookingPage/DateTimeSection/DateTimeSection";
import { BookingStatus } from "@/components/BookingPage/BookingStatus/BookingStatus";
import { AudienceSelectionSection } from "@/components/BookingPage/AudienceSelectionSection";
import { ParticipantsSection } from "@/components/BookingPage/ParticipantsSection";
import { BookingActions } from "@/components/BookingPage/BookingActions";

type SectionKey = "mainInfo" | "dateTime" | "audience" | "participants";

interface SectionStatusState {
  mainInfo: boolean;
  dateTime: boolean;
  audience: boolean;
  participants: boolean;
}

export default function BookingPage() {
  const [sectionStatus, setSectionStatus] = useState<SectionStatusState>({
    mainInfo: false,
    dateTime: false,
    audience: false,
    participants: false,
  });

  const handleSectionCompletionChange = (
    section: SectionKey,
    completed: boolean
  ) => {
    setSectionStatus((prev) =>
      prev[section] === completed ? prev : { ...prev, [section]: completed }
    );
  };

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
          mx: "auto",
          px: 3,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* HEADER */}
        <PageHeader
          title="Создание нового бронирования"
          subtitle="Заполните все необходимые данные для бронирования аудитории"
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

        {/* Основной layout: слева форма, справа сводка */}
        <Stack direction="row" spacing={3} alignItems="flex-start">
          <Box
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <MainInfoSection
              onCompletionChange={(completed) =>
                handleSectionCompletionChange("mainInfo", completed)
              }
            />
            <DateTimeSection
              onCompletionChange={(completed) =>
                handleSectionCompletionChange("dateTime", completed)
              }
            />
            <AudienceSelectionSection
              onCompletionChange={(completed) =>
                handleSectionCompletionChange("audience", completed)
              }
            />
            <ParticipantsSection
              onCompletionChange={(completed) =>
                handleSectionCompletionChange("participants", completed)
              }
            />
          </Box>

          <Box
            sx={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <BookingSummary />
            <BookingStatus
              items={[
                {
                  label: "Основная информация",
                  status: sectionStatus.mainInfo ? "success" : "error",
                },
                {
                  label: "Дата и время",
                  status: sectionStatus.dateTime ? "success" : "error",
                },
                {
                  label: "Выбор аудитории",
                  status: sectionStatus.audience ? "success" : "error",
                },
                {
                  label: "Организатор и участники",
                  status: sectionStatus.participants ? "success" : "error",
                },
              ]}
            />
            <BookingActions />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
