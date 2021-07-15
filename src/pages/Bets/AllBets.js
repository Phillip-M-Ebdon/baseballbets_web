import React, { useState } from "react";
import {
    Paper,
    Toolbar,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableSortLabel,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    TextField,
    Grid,
    IconButton
} from "@material-ui/core"
import { 
    Autocomplete,
} from "@material-ui/lab";

// Pickers
import LuxonUtils from '@date-io/luxon';
import {
    DatePicker, MuiPickersUtilsProvider
} from "@material-ui/pickers"

import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';

export const AllBets = () => {
    const games = [
        {
            "home": {
                "team": "A"
            },
            "away": {
                "team": "B"
            },
            "scheduled": "2021-03-28T17:05:00Z",
        },
        {
            "home": {
                "team": "B"
            },
            "away": {
                "team": "C"
            },
            "scheduled": "2021-03-28T17:05:00Z",
        },
    ];

    const teams = [
        {
            "name": "A",
        },
        {
            "name": "B",
        },
        {
            "name": "C",
        },
        {
            "name": "D",
        },
        {
            "name": "E",
        }
    ];

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState("time");
    const [page, setPage] = useState(0);
    const [gamesPerPage, setGamesPerPage] = useState(5);

    // Filters
    const [teamFilter, setTeamFilter] = useState(null);
    const [gamesTo, setGamesTo] = useState(new Date());
    const [gamesFrom, setGamesFrom] = useState(new Date());


    function compare (a, b, orderBy) {
        if (a[orderBy] > b[orderBy]) return -1;
        if (a[orderBy] < b[orderBy]) return 1;
        return 0;
    }

    function getComparator (order, orderBy) {
        return order === "desc" ? (a, b) => compare(a, b, orderBy) : (a, b) => -compare(a, b, orderBy)
    }

    const createSort = (property) => (event) => {
        handleSort(event, property)
    }

    const handleSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        console.log(property)
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }
    
    function sortGames(games, comparator) {
        const stableList = games.map((el, index) => [el, index]);
        stableList.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            console.log(order)
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stableList.map((el) => el[0]);
    }

    const filterGames = (games) => {

        let filteredGames = games;
        if (teamFilter) {
            filteredGames = filteredGames.filter(game => game.away.team === teamFilter || game.home.team === teamFilter)
        }
        
        if (gamesFrom) {
            filteredGames = filteredGames.filter(game => new Date(game.scheduled) >= new Date(gamesFrom))
        }

        if (gamesTo) {
            filteredGames = filteredGames.filter(game => new Date(game.scheduled) <= new Date(gamesTo))
        }

        return filteredGames;
    }

    const convertDate = (mlbDateTime) => {
        // e.g. 2021-03-28T17:05:00Z
        const date = new Date(mlbDateTime);
        return date.toLocaleString()
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    const handleGamesPerPageChange = (event) => {
        setGamesPerPage(parseInt(event.target.value, 10));
    }
    
    const handleDateChange = (func, date) => {
        if (date == null) {
            func(date)
        } else {
            func(date.toJSDate());
        }
    }

    const headCells = [
        { id: 'home', disablePadding: false, label: 'Home', sortable: true },
        { id: 'away', disablePadding: false, label: 'Away', sortable: true  },
        { id: 'time', disablePadding: false, label: 'Scheduled', sortable: true },
        { id: "bet", disablePadding: false, label: "", sortable: false }
      ];

      return (
        <Paper>
        <Toolbar >
            <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
                <Typography className="toolbar-title" component="div">
                    Open for Bets
                </Typography>
            </Grid>

            {/* Filters */}
            <Grid item xs={4}>
                <Autocomplete
                    options={teams.map(team => team.name)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Team"
                        />
                      )}
                    value={teamFilter}
                    onChange={(event, newTeam) => {
                        setTeamFilter(newTeam)
                    }}
                />
            </Grid>

            <Grid  item xs={4}>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <DatePicker
                    clearable
                    disablePast
                    label="Games from"
                    value={gamesFrom}
                    onChange={(date) => {
                        handleDateChange(setGamesFrom, date)
                    }}
                    
                />
                </MuiPickersUtilsProvider>
            </Grid>

            <Grid  item xs={4}>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <DatePicker
                    clearable
                    disablePast
                    label="Games to"
                    value={gamesTo}
                    onChange={(date) => {
                        handleDateChange(setGamesTo, date)
                    }}
                    
                />
                </MuiPickersUtilsProvider>
            </Grid>

            </Grid>
        </Toolbar>


          <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headCells.map((head) => (
                            <TableCell 
                                align="center"
                                key={head.id}
                                sortDirection={orderBy === head.id ? order : false }
                            >
                                { head.sortable ? (
                                    <TableSortLabel
                                    active={orderBy === head.id}
                                    direction={orderBy === head.id ? order : 'desc'}
                                    onClick={createSort(head.id)}
                                >
                                    {head.label}
                                </TableSortLabel>
                                ) : (
                                    <>
                                        {head.label}
                                    </>
                                )}
                                
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        filterGames(sortGames(games, getComparator(order, orderBy)))
                        .slice(page * gamesPerPage, page * gamesPerPage + gamesPerPage)
                        .map((game) => (
                            <TableRow>
                                <TableCell align="center">
                                    {
                                     game.home.logo ? <img src={game.home.logo}/> : null
                                    }
                                    {game.home.team}
                                </TableCell>
                                <TableCell align="center">                                    
                                    {game.away.team}
                                    {
                                     game.away.logo ? <img src={game.away.logo}/> : null
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    {convertDate(game.scheduled)}
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <ClearTwoToneIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
          </TableContainer>
          <TablePagination 
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={games.length}
            rowsPerPage={gamesPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleGamesPerPageChange}
            />
        </Paper>
      )
}