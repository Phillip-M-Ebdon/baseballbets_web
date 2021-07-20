import React, { useEffect, useState } from "react";
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
import { MLBApi } from "../../api/MLBApi";

const winsRegx = /[W]/g;


export const LadderTable = () => {
    const api = new MLBApi();

    const [teams, setTeams] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            const results = await api.getTeams();
            const allData = results;

            let newLadder = [];
            for (const data of allData) {
                console.log(data.lastTen.match(winsRegx), data.lastTen.match(winsRegx).length)

                newLadder.push({
                    id: data.id,
                    name: data.name,
                    wins: data.wins,
                    loses: data.loses,
                    per: data.wins / data.loses,
                    wins10: data.lastTen.match(winsRegx).length,
                    loses10: 10 - data.lastTen.match(winsRegx).length
                })
            }
            setTeams(newLadder);
        }
        fetchData();
    }, [])

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState("wins");

    function compare (a, b, orderBy) {
        if (a[orderBy] > b[orderBy]) return -1;
        if (a[orderBy] < b[orderBy]) return 1;
        // backup percentage check
        if (a["per"] > b["per"]) return -1;
        if (a["per"] < b["per"]) return 1;
        return 0;
    }

    function compareRecent (a, b, orderBy) {
        if (parseInt(a[orderBy][0]) > parseInt(b[orderBy][0])) return -1;
        if (parseInt(a[orderBy][0]) < parseInt(b[orderBy][0])) return 1;

        if (a["per"] > b["per"]) return -1;
        if (a["per"] < b["per"]) return 1;

        if (a["wins"] > b["wins"]) return -1;
        if (a["wins"] < b["wins"]) return 1;

        return 0;
    }

    function comparePercent (a, b, orderBy) {
        if (a[orderBy] > b[orderBy]) return -1;
        if (a[orderBy] < b[orderBy]) return 1;
        return 0;
    }

    function getComparator (order, orderBy) {
        console.log(orderBy)
        switch (orderBy) {
            case "recent":
                return order === "desc" ? (a, b) => compareRecent(a, b, orderBy) : (a, b) => -compareRecent(a, b, orderBy)
            
            case "per":
                return order === "desc" ? (a, b) => comparePercent(a, b, orderBy) : (a, b) => -comparePercent(a, b, orderBy)
            
            default:
                return order === "desc" ? (a, b) => compare(a, b, orderBy) : (a, b) => -compare(a, b, orderBy)
        }
    }

    const recentResults = (team) => {
        return `${team["wins10"]}-${team["loses10"]}`
    }

    const createSort = (property) => (event) => {
        handleSort(event, property)
    }

    const handleSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }
    
    function sortTeams (teams, comparator) {
        const stableList = teams.map((el, index) => [el, index]);
        stableList.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stableList.map((el) => el[0]);
    }

    const headCells = [
        { id: 'team', numeric: false, disablePadding: true, label: 'Team' },
        { id: 'wins', numeric: true, disablePadding: false, label: 'Wins' },
        { id: 'loses', numeric: true, disablePadding: false, label: 'Loses' },
        { id: 'per', numeric: true, disablePadding: false, label: 'Percent' },
        { id: 'wins10', numeric: true, disablePadding: false, label: 'Last 10' },
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
                                    {(team.wins / team.loses).toFixed(2)}
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