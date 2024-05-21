"use client";
import {Box, Button, IconButton} from "@mui/material";
import ScheduleModal from "./components/ScheduleModal";
import {useEffect, useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

import dayjs from "dayjs";
import {ISchedule} from "@/types/schedule";
import {dateFormatter} from "@/utils/dateFormatter";
import {useGetAllDoctorSchedulesQuery} from "@/redux/api/doctorScheduleApi";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const {data, isLoading} = useGetAllDoctorSchedulesQuery({});

  const schedules = data?.doctorSchedules;
  const meta = data?.meta;

  useEffect(() => {
    const updateData = schedules?.map((schedule: ISchedule, index: number) => {
      return {
        sl: index + 1,
        id: schedule?.id,
        startDate: dateFormatter(schedule?.startDate),

        startTime: dayjs(schedule?.startDate).format("hh:mm a"),
        endTime: dayjs(schedule?.endDate).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  const columns: GridColDef[] = [
    {field: "sl", headerName: "SL"},
    {field: "startDate", headerName: "Date", flex: 1},
    {field: "startTime", headerName: "Start Time", flex: 1},
    {field: "endTime", headerName: "End Time", flex: 1},
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({row}) => {
        return (
          <IconButton aria-label="delete">
            <DeleteIcon sx={{color: "red"}} />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
      <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={allSchedule ?? []} columns={columns} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default SchedulesPage;
