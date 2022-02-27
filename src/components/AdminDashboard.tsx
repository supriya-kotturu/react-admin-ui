import { useState, useEffect, useMemo, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {
	DataGrid,
	GridColDef,
	GridRowId,
	GridRowParams,
	GridActionsCellItem,
} from '@mui/x-data-grid';
import axios, { AxiosResponse } from 'axios';
import { Input } from '@mui/material';

interface HasId {
	id: string;
}
interface User extends HasId {
	id: string;
	name: string;
	email: string;
	role: string;
}

export const AdminDashboard = () => {
	const [initUsers, setInitUsers] = useState<User[] | []>([]);
	const [users, setUsers] = useState<User[] | []>([]);
	const [deleteSelected, setDeleteSelected] = useState<boolean>(false);
	const [selectedUsers, setSelectedUsers] = useState<GridRowId[] | []>([]);
	const [search, setSearch] = useState<string>('');

	useEffect(() => {
		const url = import.meta.env.VITE_USER_DATA_URL;
		axios.get(url).then((res: AxiosResponse) => {
			setUsers(res.data);
			setInitUsers(res.data);
		});
	}, []);

	useEffect(() => {
		deleteSelected &&
			setUsers((prevUsers: User[]) =>
				prevUsers.filter((user: User) => {
					// @ts-ignore:next-line
					return user && selectedUsers.indexOf(user.id) === -1;
				})
			);
		setDeleteSelected(false);
	}, [deleteSelected]);

	useEffect(() => {}, [search]);
	const handleDelete = useCallback(
		(id: GridRowId): void => {
			setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
		},
		[users]
	);

	const handleSelectUsers = useCallback(
		(ids: GridRowId[]): void => {
			setSelectedUsers(ids);
		},
		[selectedUsers]
	);

	useEffect(() => {
		search.length > 0
			? setUsers((prevUsers) =>
					prevUsers.filter((user) => user.name.includes(search))
			  )
			: setUsers(initUsers);
	}, [search]);

	const columns: GridColDef[] = useMemo(
		() => [
			{ field: 'id', headerName: 'Id', width: 80 },
			{ field: 'name', headerName: 'Name', width: 290, editable: true },
			{ field: 'email', headerName: 'Email', flex: 0.5, editable: true },
			{ field: 'role', headerName: 'Role', width: 100, editable: true },
			{
				field: 'actions',
				type: 'actions',
				width: 80,
				getActions: (params: GridRowParams) => {
					return [
						<GridActionsCellItem
							icon={<DeleteIcon color="error" />}
							label="Delete"
							onClick={() => handleDelete(params.id)}
						/>,
					];
				},
			},
		],
		[handleDelete]
	);

	return (
		<Container
			maxWidth="lg"
			sx={{ backgroundColor: '#fefefe', height: '70vh' }}
		>
			<Input
				id="search"
				type="text"
				placeholder="Jim Mc Clain"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				endAdornment={
					<InputAdornment position="end">
						<SearchIcon color="primary" />
					</InputAdornment>
				}
				sx={{ marginBottom: 4, width: '40vw' }}
			/>
			<DataGrid
				rows={users}
				columns={columns}
				pageSize={10}
				pagination={true}
				checkboxSelection
				rowsPerPageOptions={[10]}
				disableSelectionOnClick
				onSelectionModelChange={(ids) => handleSelectUsers(ids)}
			/>
			<Button
				color="error"
				variant="contained"
				onClick={() => setDeleteSelected(true)}
				sx={{
					marginY: 4,
					position: 'absolute',
					left: '20vw',
					color: 'maroon',
				}}
			>
				Delete
			</Button>
		</Container>
	);
};
