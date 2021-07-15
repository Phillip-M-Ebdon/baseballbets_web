import React, { useState } from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableSortLabel,
    TableRow,
    TableCell,
    TableBody
} from "@material-ui/core"

import "./Ladder.css"

export const LadderTable = () => {
    const teams = [
        {
            "name": "A",
            "wins": 23,
            "loses": 17,
            "wins10": 5,
            "loses10": 5
        },
        {
            "name": "B",
            "wins": 17,
            "loses": 23,
            "wins10": 8,
            "loses10": 2
        },
        {
            "name": "C",
            "wins": 20,
            "loses": 20,
            "wins10": 2,
            "loses10": 8
        },
        {
            "name": "D",
            "wins": 29,
            "loses": 11,
            "wins10": 9,
            "loses10": 1
        },
        {
            "name": "E",
            "wins": 5,
            "loses": 35,
            "wins10": 0,
            "loses10": 10
        }
    ];

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState("wins");

    function compare (a, b, orderBy) {
        if (a[orderBy] > b[orderBy]) return -1;
        if (a[orderBy] < b[orderBy]) return 1;
        return 0;
    }

    function getComparator (order, orderBy) {
        return order === "desc" ? (a, b) => compare(a, b, orderBy) : (a, b) => -compare(a, b, orderBy)
    }

    const recentResults = (team) => {
        console.log(team)
        return `${team["wins10"]}-${team["loses10"]}`
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
    
    function sortTeams (teams, comparator) {
        const stableList = teams.map((el, index) => [el, index]);
        stableList.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            console.log(order)
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stableList.map((el) => el[0]);
    }

    const headCells = [
        { id: 'team', numeric: false, disablePadding: true, label: 'Team' },
        { id: 'wins', numeric: true, disablePadding: false, label: 'Wins' },
        { id: 'loses', numeric: true, disablePadding: false, label: 'Loses' },
        { id: 'recent', numeric: true, disablePadding: false, label: 'Last 10' },
      ];

      return (
          <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headCells.map((head) => (
                            <TableCell
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
                        sortTeams(teams, getComparator(order, orderBy))
                        .map((team) => (
                            <TableRow>
                                <TableCell>
                                    {
                                     team.logo ? <img src={team.logo}/> : null
                                    }
                                    {team.name}
                                </TableCell>
                                <TableCell>
                                    {team.wins}
                                </TableCell>
                                <TableCell>
                                    {team.loses}
                                </TableCell>
                                <TableCell>
                                    {recentResults(team)}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
          </TableContainer>
      )
}