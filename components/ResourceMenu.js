import React, { Component, Fragment } from 'react'
import Router from 'next/router'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import { MoreVertical } from 'react-feather'
import Axios from 'axios'
import Anchor from './Anchor'

class ResourceMenu extends Component {
  static propTypes = {
    resource: PropTypes.string,
    item: PropTypes.object,
    extraMenus: PropTypes.array
  }

  static defaultProps = {
    extraMenus: []
  }

  state = {
    anchorEl: null
  }

  headers = {
    'x-access-token': localStorage.getItem('ADV_TOKEN')
  }

  onDelete = async () => {
    const { item, resource } = this.props
    const deleted = confirm('Você tem certeza que deseja deletar este item?')

    if (deleted) {
      await Axios.delete(`/api/${resource}/${item._id}`, { headers: this.headers })
      Router.push(`/admin/dashboard/${resource}`)
    }
  }

  get menus() {
    const { resource, extraMenus, item } = this.props
    return [
      {
        link: `/admin/dashboard/${resource}/edit/${item._id}`,
        text: 'Editar'
      },
      {
        onClick: this.onDelete,
        text: 'Deletar'
      },
      ...extraMenus
    ]
  }

  getLink = link => {
    if (typeof link === 'function') {
      return link(this.props.item)
    }

    return link
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const { item } = this.props
    return (
      <Fragment>
        <MoreVertical
          onClick={this.handleClick}
        />

        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.menus.map(menu => (
            <Anchor href={this.getLink(menu.link)} target={menu.target} >
              <MenuItem key={menu.text} onClick={() => {
                this.handleClose()
                menu.onClick && menu.onClick(item)
              }}>{menu.text}</MenuItem>
            </Anchor>
          ))}
        </Menu>
      </Fragment>
    )
  }
}

export default ResourceMenu
