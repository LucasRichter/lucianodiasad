import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Users, Settings, Gift, List as ListIcon, User, Image, LogOut, Bookmark } from 'react-feather'
import { ListItemIcon } from '@material-ui/core'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper
  }
})

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />
}

const links = {
  events: 'Eventos',
  guests: 'Nomes na lista',
  tabs: 'Seções',
  images: 'Galeria',
  users: 'Usuários',
  config: 'Configurações'
}

const icons = {
  images: <Image />,
  events: <Gift />,
  guests: <User />,
  lists: <ListIcon />,
  tabs: <Bookmark />,
  users: <Users />,
  config: <Settings />
}

const hrefs = {
  config: 'config/edit/current'
}

function AdminList(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <List component='nav'>
        {Object.entries(links).map(([ key, value ]) => (
          <ListItemLink key={key} href={`/admin/dashboard/${hrefs[key] || key}`}>
            <ListItemIcon>
              {icons[key]}
            </ListItemIcon>
            <ListItemText primary={value} />
          </ListItemLink>
        ))}
        <ListItemLink onClick={() => localStorage.setItem('ADV_TOKEN', '')} href={`/admin`}>
          <ListItemIcon>
            <LogOut />
          </ListItemIcon>
          <ListItemText primary='Sair' />
        </ListItemLink>
      </List>
    </div>
  )
}

AdminList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AdminList)
