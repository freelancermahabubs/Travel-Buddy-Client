"use client";
import {Box, Button, IconButton, Stack, TextField} from "@mui/material";

import {useState} from "react";

import {DataGrid, GridColDef} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDebounced} from "@/redux/hooks";
import {toast} from "sonner";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import {useDeleteUserMutation, useGetAllUserQuery} from "@/redux/api/userApi";

const ManageUsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  // console.log(searchTerm);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const {data, isLoading} = useGetAllUserQuery({...query});
  const [deleteUser] = useDeleteUserMutation();


  const users = data?.data;

  const meta = data?.meta;

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteUser(id).unwrap();
    

      if (res?.statusCode === 200) {
        toast.success(res.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    {field: "username", headerName: "User Name", flex: 1},
    {field: "email", headerName: "Email", flex: 1},
    {field: "contactNumber", headerName: "Contact Number", flex: 1},
    {field: "role", headerName: "Role", flex: 1},
    {field: "gender", headerName: "Gender", flex: 1},
    {field: "status", headerName: "Status", flex: 1},

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({row}) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleDelete(row?.id)}
              aria-label="delete">
              <DeleteIcon sx={{color: "red"}} />
            </IconButton>
            <Link href={`/dashboard/admin/manage-users/edit/${row?.id}`}>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="search users"
        />
      </Stack>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={users} columns={columns} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default ManageUsersPage;
