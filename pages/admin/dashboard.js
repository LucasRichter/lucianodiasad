import React, { Component } from 'react'
import PageHead from '../../components/PageHead'
import { Flex, Box } from '@rebass/grid'
import Router from 'next/router'
import { withSnackbar } from 'notistack'
import Axios from 'axios'
import PropTypes from 'prop-types'
import Table from '../../components/Table'
import * as resources from '../../helpers/adminResources'
import AdminMenu from '../../components/AdminMenu'
import { Button } from '@material-ui/core'
import { H2, H1, H3 } from '../../components/Title'
import ResourceMenu from '../../components/ResourceMenu'
import AdminForm from '../../components/AdminForm'

class IndexPage extends Component {
  static propTypes = {
    items: PropTypes.array,
    action: PropTypes.string,
    item: PropTypes.object,
    enqueueSnackbar: PropTypes.func.isRequired,
    resource: PropTypes.string,
    subtitle: PropTypes.string
  }

  static defaultProps = {
    items: [],
    item: {}
  }

  static async getInitialProps ({ query: { filterResource, filterValue, subtitle, id, resource, action }, ...props }) {
    let items, item
    let options = resources.params[resource] || {}
    let params = {
      ...options,
      [filterResource]: filterValue
    }

    if (resource) {
      if (!action) {
        const res = await Axios.get(`/api/${resource}`, { params })
        items = res.data
      }

      if (id) {
        const res = await Axios.get(`/api/${resource}/${id}`, { params })
        item = res.data
      }
    }

    return { items, item, resource, action, subtitle }
  }

  get content() {
    const { resource, action, items, item, enqueueSnackbar, subtitle } = this.props

    if (!resource) {
      return <H1>Dashboard</H1>
    }

    switch (action) {
      case 'edit':
      case 'create':
        return (
          <AdminForm
            onSuccess={() => {
              Router.push('/admin/dashboard')
              enqueueSnackbar('Conteúdo salvo com sucesso!', { variant: 'success' })
            }}
            onError={error => {
              let {message, errors} = error.response.data
              if (errors) {
                message = Object.values(errors).join(', ')
              }
              enqueueSnackbar(message, { variant: 'error' })
            }}
            resource={resource}
            item={item}
          />
        )

      default:
        return (
          <Box>
            <Flex
              justifyContent='space-between'
            >
              <H2>
                {resource}
              </H2>

              {subtitle &&
              <H3>
                {subtitle}
              </H3>}

              <Button
                href={`/admin/dashboard/${resource}/create`}
                variant='contained'
                color='default'
              >
                Criar
              </Button>
            </Flex>
            <Table
              columns={[
                ...resources.columns[resource],
                {
                  title: 'Ações',
                  text: s => <ResourceMenu resource={resource} extraMenus={resources.extraMenus[resource]} item={s} />
                }
              ]}
              items={items}
            />
          </Box>
        )
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('ADV_TOKEN')

    if (!token) {
      document.location.pathname = '/admin'
    }
  }

  onChange = e => {
    e.preventDefault()
    const { id, value } = e.target

    this.setState({ [id]: value })
  }

  render () {
    return (
      <main>
        <PageHead
          title='Luciano Dias | Dashboard'
          description='Login'
        />

        <Flex
          css={{ backgroundColor: '#333533', textAlign: 'center' }}
          m={['20px 0', '0']}
          p={['20px']}
        >
          <AdminMenu />
          {this.content}
        </Flex>

      </main>
    )
  }
}

export default withSnackbar(IndexPage)
