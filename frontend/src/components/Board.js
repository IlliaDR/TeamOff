import React, { useState, useEffect } from 'react';
import { apiLinks } from './data/apiLinks';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MediaCard from './Card';
import Switch from '@mui/material/Switch';
import { regEx } from './data/Regex';


const Board = () => {
    const [userTasks, setUserTasks] = useState([]);
    const [userList, setUserList] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [filterEnabled, setFilterEnabled] = useState(false);
    const [filteredUserId, setFilteredUserId] = useState(1);
    const [enteredTaskName, setEnteredTaskName] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredUserId, setEnteredUserId] = useState(1);
    const [enteredStatusId, setEnteredStatusId] = useState(1);
    const [taskEditId, setTaskEditId] = useState(0);
    const [taskDeleteId, setTaskDeleteId] = useState(0);


    useEffect(() => {
        fetch(apiLinks.API_USERS)
            .then(response => response.json())
            .then(data => {
                const loadedUsers = [];
                for (const key in data) {
                    loadedUsers.push({
                        userId: data[key].userId,
                        userName: data[key].userName,
                    });
                }
                setUserList(loadedUsers);
            });
    }, []);

    useEffect(() => {
        fetch(apiLinks.API_TASKS)
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                const loadedTasks = [];
                let filteredTasks = [];
                for (const key in responseData) {
                    loadedTasks.push({
                        id: responseData[key].taskId,
                        title: responseData[key].taskName,
                        description: responseData[key].taskDescription,
                        userId: responseData[key].userId,
                        statusId: responseData[key].statusId
                    });
                }

                filteredTasks = loadedTasks.filter(function (item) {
                    return item.userId === filteredUserId;
                }).map(function ({ id, title, description, userId, statusId }) {
                    return { id, title, description, userId, statusId };
                });

                filterEnabled ? setUserTasks(filteredTasks) : setUserTasks(loadedTasks);
            });
    }, [filterEnabled, filteredUserId]);

    const loadTaskHandler = () => {
        fetch(apiLinks.API_TASKS)
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                const loadedTasks = [];
                for (const key in responseData) {
                    loadedTasks.push({
                        id: responseData[key].taskId,
                        title: responseData[key].taskName,
                        description: responseData[key].taskDescription,
                        userId: responseData[key].userId,
                        statusId: responseData[key].statusId
                    });
                }
                setUserTasks(loadedTasks);
                if (filterEnabled===true) {
                    setFilterEnabled (false);
                    setFilterEnabled(true);
                }
            });
    };

    const loadTargetTaskHandler = taskId => {
        fetch(`${apiLinks.API_TASKS}${taskId}`)
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                setEnteredTaskName(responseData.taskName);
                setEnteredDescription(responseData.taskDescription);
                setEnteredUserId(responseData.userId);
                setEnteredStatusId(responseData.statusId);
            })
    };

    const addTaskHandler = task => {
        fetch(apiLinks.API_TASKS, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                response.json();
            })
            .then(() => { loadTaskHandler(); })
    };

    const editTaskHandler = task => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        };
        fetch(`${apiLinks.API_TASKS}${taskEditId}`, requestOptions)
            .then(response => {
                response.json();
            })
            .then(() => { loadTaskHandler(); })
    };

    const removeTaskHandler = () => {
        fetch(
            `${apiLinks.API_TASKS}${taskDeleteId}`,
            {
                method: 'DELETE'
            }
        ).then(response => {
            setUserTasks(prevTasks =>
                prevTasks.filter(task => task.id !== taskDeleteId)
            );
        });
        setOpenDelete(false);
    };

    const submitAddHandler = () => {
        addTaskHandler({
            taskName: enteredTaskName,
            taskDescription: enteredDescription,
            userId: parseInt(enteredUserId),
            statusId: parseInt(enteredStatusId)
        });
        setOpenAdd(false);
    };

    const submitEditHandler = () => {
        editTaskHandler({
            taskId: parseInt(taskEditId),
            taskName: enteredTaskName,
            taskDescription: enteredDescription,
            userId: parseInt(enteredUserId),
            statusId: parseInt(enteredStatusId)
        });
        setOpenEdit(false);
    };

    const handleAddOpen = () => {
        setEnteredTaskName('');
        setEnteredDescription('');
        setEnteredUserId(1);
        setEnteredStatusId(1);
        setOpenAdd(true);
    };

    const handleAddClose = () => {
        setOpenAdd(false);
    };

    const handleEditOpen = taskId => {
        loadTargetTaskHandler(taskId);
        setTaskEditId(taskId);
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
    };

    const handleDeleteOpen = taskId => {
        setTaskDeleteId(taskId);
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    const handleChange = (event) => {
        setFilterEnabled(event.target.checked);
    };


    return (
        <div>
            <Box sx={{ '& > :not(style)': { m: 2 } }}>
                <Fab color="secondary" aria-label="add" onClick={handleAddOpen}>
                    <AddIcon />
                </Fab>
                <Switch
                    checked={filterEnabled}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <FormControl>
                    <InputLabel id="user-picker">User ?</InputLabel>
                    <Select
                        labelId="user-picker-label"
                        id="user-picker-select"
                        value={filteredUserId}
                        label="Status"
                        onChange={e => setFilteredUserId(e.target.value)}
                    >
                        {userList.map((user) => (
                            <MenuItem key={user.userId} value={user.userId}>{user.userName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Dialog open={openAdd} onClose={handleAddClose}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Let's get the work started.
                        Put some info on the tasks you want to acomplish.
                        Don't forget to complete all the lines below.
                    </DialogContentText>
                    <TextField
                        inputProps={{ maxLength: 49 }}
                        autoFocus margin="dense" id="taskNameAdd"
                        defaultValue={enteredTaskName}
                        onBlur={e => { regEx.test(e.target.value) ? setEnteredTaskName(e.target.value) : setEnteredTaskName("Task to be edited"); }}
                        label="Task Name" type="text" fullWidth variant="standard" />
                    <TextField
                        inputProps={{ maxLength: 199 }}
                        multiline
                        margin="dense" id="taskDescriptionAdd"
                        defaultValue={enteredDescription}
                        onBlur={e => { regEx.test(e.target.value) ? setEnteredDescription(e.target.value) : setEnteredDescription("Description is not specified"); }}
                        label="Description" type="text" fullWidth variant="standard" />
                    <Box
                        sx={{
                            paddingTop: 3,
                            minWidth: 120
                        }}>
                        <FormControl fullWidth>
                            <InputLabel id="user-picker">User</InputLabel>
                            <Select
                                labelId="user-picker-label"
                                id="user-picker-select"
                                value={enteredUserId}
                                label="Status"
                                onChange={e => setEnteredUserId(e.target.value)}
                            >
                                {userList.map((user) => (
                                    <MenuItem key={user.userId} value={user.userId}>{user.userName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            paddingTop: 3,
                            minWidth: 120
                        }}>
                        <FormControl fullWidth>
                            <InputLabel id="status-picker">Status</InputLabel>
                            <Select
                                labelId="status-picker-label"
                                id="status-picker-select"
                                value={enteredStatusId}
                                label="Status"
                                onChange={e => setEnteredStatusId(e.target.value)}
                            >
                                <MenuItem value={1}>Todo</MenuItem>
                                <MenuItem value={2}>In Progress</MenuItem>
                                <MenuItem value={3}>Done</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel</Button>
                    <Button onClick={submitAddHandler}>Add Task</Button>
                </DialogActions>
            </Dialog>
            <section>
                <MediaCard
                    Tasks={userTasks}
                    Users={userList}
                    onRemoveItem={handleDeleteOpen}
                    onEditItem={handleEditOpen}
                />
                <Dialog open={openEdit} onClose={handleEditClose}>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            So you need to change something.
                            We're not here to judge you,
                            but don't forget to complete all the lines below as usual.
                        </DialogContentText>
                        <TextField
                            inputProps={{ maxLength: 49 }}
                            autoFocus margin="dense" id="taskNameEdit"
                            value={enteredTaskName}
                            onChange={e => { setEnteredTaskName(e.target.value) }}
                            label="Task Name" type="text" fullWidth variant="standard" />
                        <TextField
                            inputProps={{ maxLength: 199 }}
                            multiline
                            margin="dense" id="taskDescriptionEdit"
                            value={enteredDescription}
                            onChange={e => setEnteredDescription(e.target.value)}
                            label="Description" type="text" fullWidth variant="standard" />
                        <Box
                            sx={{
                                paddingTop: 3,
                                minWidth: 120
                            }}>
                            <FormControl fullWidth>
                                <InputLabel id="user-picker">User</InputLabel>
                                <Select
                                    labelId="user-picker-label"
                                    id="user-picker-select"
                                    value={enteredUserId}
                                    label="Status"
                                    onChange={e => setEnteredUserId(e.target.value)}
                                >
                                    {userList.map((user) => (
                                        <MenuItem key={user.userId} value={user.userId}>{user.userName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            sx={{
                                paddingTop: 3,
                                minWidth: 120
                            }}>
                            <FormControl fullWidth>
                                <InputLabel id="status-picker">Status</InputLabel>
                                <Select
                                    labelId="status-picker-label"
                                    id="status-picker-select"
                                    value={enteredStatusId}
                                    label="Status"
                                    onChange={e => setEnteredStatusId(e.target.value)}
                                >
                                    <MenuItem value={1}>Todo</MenuItem>
                                    <MenuItem value={2}>In Progress</MenuItem>
                                    <MenuItem value={3}>Done</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button onClick={submitEditHandler}>Edit Task</Button>
                    </DialogActions>
                </Dialog>
                <section>
                    <Dialog
                        open={openDelete}
                        onClose={handleDeleteClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Deleting the task!"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Do you really want to remove the task?
                                No backups have been made. Choose wisely!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteClose}>Cancel</Button>
                            <Button onClick={removeTaskHandler} autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </section>
            </section>
        </div>
    );
};

export default Board;
