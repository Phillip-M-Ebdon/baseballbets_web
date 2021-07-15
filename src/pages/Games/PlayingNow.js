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
    TablePagination
} from "@material-ui/core"


export const PlayingNow = () => {
    const games = [
        {
            "home": {
                "team": "A",
                "score": 3
            },
            "away": {
                "team": "B",
                "score": 2
            },
            "inning": 4,
            "started": "2021-03-28T17:05:00Z",
        },
    ];

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState("wins");
    const [page, setPage] = useState(0);
    const [gamesPerPage, setGamesPerPage] = useState(5);

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

    const headCells = [
        { id: 'home', disablePadding: false, label: 'Home' },
        { id: 'homeScore', disablePadding: false, label: ' ' },
        { id: 'awayScore', disablePadding: false, label: ' ' },
        { id: 'away', disablePadding: false, label: 'Away' },
        { id: 'inning', disablePadding: false, label: 'Inning' },
        { id: 'started', disablePadding: false, label: 'Started' },
      ];

      return (
        <Paper>
            <Toolbar>
                <Typography>
                    Playing Now
                </Typography>
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
                                    align="center"
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
                        sortGames(games, getComparator(order, orderBy))
                        .map((game) => (
                            <TableRow>
                                <TableCell align="center">
                                    {
                                     game.home.logo ? <img src={game.home.logo}/> : null
                                    }
                                    {game.home.team}
                                </TableCell>
                                <TableCell align="left">
                                    {game.home.score}
                                </TableCell>
                                <TableCell align="right">
                                    {game.away.score}
                                </TableCell>
                                <TableCell align="center">                                    
                                    {game.away.team}
                                    {
                                     game.away.logo ? <img src={game.away.logo}/> : null
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    {game.inning}
                                </TableCell>
                                <TableCell align="center">
                                    {convertDate(game.started)}
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