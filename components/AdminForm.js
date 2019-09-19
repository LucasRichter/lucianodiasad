import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@rebass/grid'
import { fields } from '../helpers/adminResources'
import { Button } from '@material-ui/core'
import { H2 } from './Title'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import CheckboxField from './CheckboxField'
import TextField from './TextField'
import Text from './Text'
import styled from 'styled-components'
import draftToHtml from 'draftjs-to-html'
import Axios from 'axios'
import toFormData from 'json-form-data'
import difference from '../helpers/difference'
import { Trash2 } from 'react-feather'
import DocumentPreview from './DocumentPreview'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import ChipInput from 'material-ui-chip-input'
import { SketchPicker } from 'react-color'

const Container = styled(Box)`
  width: 100%;

  .demo-editor {
    height: 275px !important;
    border: 1px solid #F1F1F1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }

  .demo-wrapper {
    width: 100% !important;
    display: block !important;
    margin-bottom: 25px !important;
    height: 400px !important;
  }
`

export default class AdminForm extends Component {
  static propTypes = {
    resource: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    item: PropTypes.object
  }

  static defaultProps = {
    item: {}
  }

  state= {
    ...this.props.item,
    buttonDisabled: false,
    errors: {}
  }

  async componentDidMount() {
    this.headers = {
      'x-access-token': localStorage.getItem('ADV_TOKEN')
    }
    const currentFields = fields[this.props.resource]

    const selectFields = currentFields.filter(s => s.type === 'select')

    for (let field of selectFields) {
      const res = await Axios.get(`/api/${field.resource}`)
      this.setState({ [`options${field.id}`]: res.data })
    }
  }

  onChange = e => {
    const { id, name, value, checked, files } = e.target
    const key = id || name
    const current = (files && files[0]) || checked || value
    this.setState({ [key]: current,
      errors: {
        ...this.state.errors,
        [key]: ''
      } })
  }

  getField = ({ id, label, type, parseDefaultValue, selectKey }) => {
    const { errors } = this.state
    const value = this.state[id]
    const defaultProps = {
      margin: 'dense',
      id: id,
      type: type || 'text',
      onChange: this.onChange,
      error: errors[id],
      errorText: errors[id]
    }

    switch (type) {
      case 'color': {
        return (
          <SketchPicker
            color={value}
            onChangeComplete={color => this.onChange({ target: { id, value: color.hex } })}
          />
        )
      }
      case 'array': {
        return (
          <ChipInput
            value={value}
            onAdd={(chip) => this.onChange({ target: { id: id, value: [ chip, ...value ] } })}
            onDelete={(chip, index) => this.onChange({ target: { id: id, value: [ ...value.filter(c => c !== chip) ] } })}
          />
        )
      }
      case 'select': {
        const options = this.state[`options${id}`] || []
        const selected = value && typeof value === 'object' ? value._id : value
        return (
          <FormControl style={{ width: '100%' }} >
            <Select
              value={selected}
              onChange={this.onChange}
              inputProps={{
                name: id,
                id
              }}
            >
              {options.map(e => (
                <MenuItem key={e._id} value={e._id}>{e[selectKey]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      }
      case 'editor':
        return (
          <Editor
            defaultEditorState={value !== undefined && typeof value === 'string' && parseDefaultValue(value)}
            wrapperClassName='demo-wrapper'
            editorClassName='demo-editor'
            onEditorStateChange={editor =>
              this.onChange({ target: { id: id, value: editor } })
            }
          />

        )
      case 'boolean':
        return (
          <CheckboxField
            id={id}
            onChange={this.onChange}
            label={label}
            checked={value}
          />
        )

      case 'file': {
        return value
          ? (
            <Flex column>
              <DocumentPreview document={value} />
              <Box mt='8px' width='fit-content'>
                <Button variant='contained' color='secondary' onClick={() => this.onChange({ target: { id, value: undefined } })} >
                  <Trash2 size={16} /> Remover anexo
                </Button>
              </Box>
            </Flex>
          )
          : (
            <TextField
              {...defaultProps}
            />)
      }

      default:
        return (
          <TextField
            defaultValue={parseDefaultValue ? parseDefaultValue(value) : value}
            {...defaultProps}
          />
        )
    }
  }

  get form() {
    const { resource } = this.props

    return fields[resource].map(field => (
      <Box key={field.id} m='20px' css={{ textAlign: 'left', width: '100%' }} >
        {field.type !== 'boolean' &&
        <Text>
          {field.label}:
        </Text>}
        {this.getField(field)}
      </Box>
    ))
  }

  onSubmit = () => {
    const { resource, onSuccess, onError } = this.props
    const state = { ...this.state }
    const allFields = fields[resource]
    let isFormdata = false
    let error = false
    let errors = {}

    for (let field of allFields) {
      let value = state[field.id]
      if (field.required && !value) {
        errors[field.id] = 'Dado obrigatório'
        error = true
      }

      if (field.type === 'boolean') {
        state[field.id] = Boolean(value)
      }

      if (value && typeof value !== 'string' && field.type === 'editor') {
        const draft = draftToHtml(convertToRaw(value.getCurrentContent())).replace(new RegExp('<br>', 'g'), '<br />')
        state[field.id] = draft
      }

      if (field.type === 'file') {
        isFormdata = true
      }
    }

    if (error) {
      this.setState({ errors })
      return
    }

    let func
    let url = `/api/${resource}`
    if ('_id' in state) {
      url += `/${state._id}`
      func = Axios.put
    } else {
      func = Axios.post
    }

    delete state.errors
    delete state.buttonDisabled

    let parse = difference(state, this.props.item)
    parse = isFormdata ? toFormData(parse) : parse

    this.setState({ buttonDisabled: true })
    func(url, parse, { headers: this.headers })
      .then(() => onSuccess())
      .catch(error => onError(error))
      .finally(() => this.setState({ buttonDisabled: false }))
  }

  render() {
    const { resource } = this.props
    return (
      <Container mx='40px'>
        <H2>
          {resource}
        </H2>
        {this.form}
        <Button variant='contained' disabled={this.state.buttonDisabled} onClick={this.onSubmit} color='primary' size='large'>
              Salvar
        </Button>
      </Container>
    )
  }
}
