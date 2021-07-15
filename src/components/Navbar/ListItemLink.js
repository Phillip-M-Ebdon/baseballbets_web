import React from "react"
import { Link } from 'react-router-dom'

import {
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core"

export const ListItemLink = (props) => {

    const { icon, text, to } = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
        [to],
      );

    return (
            <ListItem button component={renderLink}>
                <ListItemIcon>
                    { icon }
                </ListItemIcon>
                <ListItemText>
                    { text }
                </ListItemText>
            </ListItem>
    )
}