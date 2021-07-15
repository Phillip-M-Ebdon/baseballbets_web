import React, {useState} from "react"
import {
    IconButton,
    Menu,
    MenuItem
} from "@material-ui/core"
import { FilterListTwoTone } from "@material-ui/icons"

export const TeamFilter = (props) => {

    const [open, setOpen] = useState(null);
    const teams = [
        {
            "name": "A"
        },
        {
            "name": "B"
        }
    ]

    const handleOpen = (event) => {
        setOpen(event.currentTarget)
    }

    const handleClose = (event) => {
        props.setTeamFilter(event.currentTarget.dataset.value)
        setOpen(null)
    }

    return (
        <div>
            <IconButton 
            onClick={handleOpen}>
                <FilterListTwoTone />
            </IconButton>
            <Menu
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleClose}
            >
                {
                    teams.map((team) => (
                        <MenuItem 
                            key={team.name}
                            data-value={team.name}
                            onClick={handleClose}>
                            { team.name }
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    )
}