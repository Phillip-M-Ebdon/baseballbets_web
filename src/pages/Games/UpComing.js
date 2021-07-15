import React, { useState } from "react";
import {
    Paper,
    Toolbar,
    Typography,
    Tooltip,
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableSortLabel,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
} from "@material-ui/core"
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';

import { TeamFilter } from "./TeamFilter"


export const UpComing = () => {
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

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState("wins");
    const [page, setPage] = useState(0);
    const [gamesPerPage, setGamesPerPage] = useState(5);
    const [teamFilter, setTeamFilter] = useState(null);

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
    
    function sortGames(teams, comparator) {
        const stableList = teams.map((el, index) => [el, index]);
        stableList.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            console.log(order)
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stableList.map((el) => el[0]);
    }

    const filterByTeam = (games) => {
        return teamFilter 
        ? games.filter(game => (game.away.team === teamFilter || game.home.team === teamFilter))
        : games
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

    function handleFilterChange(newTeamFilter) {
        setTeamFilter(newTeamFilter);
    }

    function handleClearFilter() {
        setTeamFilter(null);
    }
    

    const headCells = [
        { id: 'home', disablePadding: false, label: 'Home' },
        { id: 'away', disablePadding: false, label: 'Away' },
        { id: 'time', disablePadding: false, label: 'Scheduled' },
      ];

      return (
        <Paper>
        <Toolbar>
            <Typography className="toolbar-title" component="div">
                Up coming
            </Typography>
            
                
                {
                    teamFilter
                    ? ( 
                        <>
                            <Typography>
                                {teamFilter}
                            </Typography>
                            <IconButton onClick={handleClearFilter}>
                                <ClearTwoToneIcon />
                            </IconButton>
                        </>
                    )
                    : (
                        <Tooltip title="Filter by Team" class="toolbar-filter">
                            <TeamFilter setTeamFilter={handleFilterChange}/>
                        </Tooltip>
                    )
                }
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
                                <TableSortLabel
                                    active={orderBy === head.id}
                                    direction={orderBy === head.id ? order : 'desc'}
                                    onClick={createSort(head.id)}
                                >
                                    {head.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        filterByTeam(sortGames(games, getComparator(order, orderBy)))
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