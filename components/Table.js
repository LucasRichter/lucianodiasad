import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Text from './Text'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'scroll'
  },
  table: {
    minWidth: 'auto'
  }
})

class MainTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.array,
    columns: PropTypes.array
  }

  get(item, getter, crop, isDescription = false) {
    let value

    if (typeof getter === 'string') {
      value = item[getter]
    }
    if (typeof getter === 'function') {
      value = getter(item)
    }

    if (value) {
      if (React.isValidElement(value)) {
        return value
      } else {
        return (
          <Text>
            {value || '-'}
          </Text>
        )
      }
    }

    return ''
  }

  render() {
    const { classes, items, columns } = this.props

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.key}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(row => (
              <TableRow key={row._id}>
                {columns.map(({ key, text, _id }) => (
                  <TableCell key={_id}>
                    {this.get(row, text || key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(MainTable)
