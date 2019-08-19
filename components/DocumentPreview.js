import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import blobToBase64 from '../helpers/blobToBase64'

export default class DocumentPreview extends PureComponent {
  static propTypes = {
    document: PropTypes.object
  }

  static defaultProps = {
    isProtected: true
  }

  state = {
    document: undefined,
    fileContent: undefined,
    pageNumber: 1,
    openPdf: false
  }

  componentDidMount() {
    this.fetchDocument()
  }

  componentDidUpdate(prevProps) {
    if (this.props.document !== prevProps.document) {
      this.fetchDocument()
    }
  }

  fetchDocument = () => {
    const { document } = this.props

    if (document && typeof document === 'object') {
      if ('path' in document) {
        this.setState({ fileContent: `/${document.path}` })
      } else {
        blobToBase64(document)
          .then(fileContent => this.setState({ fileContent }))
      }
    }
  }

  render() {
    const { fileContent } = this.state
    return (
      <img
        style={{ height: 320 }}
        src={fileContent}
      />
    )
  }
}
