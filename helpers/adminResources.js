import moment from 'moment'
import React from 'react'
import { X, Check } from 'react-feather'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'

export const fields = {
  images: [
    {
      id: 'file',
      type: 'file',
      required: true,
      label: 'File'
    },
    {
      id: 'carousel',
      label: 'Mostrar no carossel',
      type: 'boolean'
    },
    {
      id: 'birthday',
      label: 'Mostrar na tab Aniversários',
      type: 'boolean'
    },
    {
      id: 'college',
      label: 'Mostrar na tab Formaturas',
      type: 'boolean'
    },
    {
      id: 'home',
      label: 'Mostrar na tab A Casa',
      type: 'boolean'
    }
  ],
  config: [
    {
      id: 'home_text',
      type: 'editor',
      parseDefaultValue: s => {
        const blocksFromHTML = convertFromHTML(s)
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        return EditorState.createWithContent(state)
      },
      required: true,
      label: 'Texto do Escritório'
    },
    {
      id: 'facebook',
      label: 'Facebook Link'
    },
    {
      id: 'instagram',
      label: 'Instragram Link'
    },
    {
      id: 'twitter',
      label: 'Twitter Link'
    },
    {
      id: 'twitter_user',
      label: 'Twitter User'
    },
    {
      id: 'number_events',
      label: 'Número de eventos na home',
      type: 'number'
    },
    {
      id: 'instagram_photos',
      label: 'Número de fotos na Tab Fotos',
      type: 'number'
    },
    {
      id: 'instagram_token',
      label: 'Token para acessar fotos do instagram'
    },
    {
      id: 'contact_email',
      label: 'Contato'
    }
  ],
  guests: [
    {
      id: 'event',
      label: 'Festa',
      type: 'select',
      selectKey: 'party',
      resource: 'events?guests=true'
    },
    {
      id: 'email',
      label: 'E-mail',
      type: 'email'
    },
    {
      id: 'name',
      label: 'Nome'
    }
  ],
  users: [
    {
      id: 'email',
      autocompleteOff: true,
      label: 'Username'
    },
    {
      id: 'password',
      autocompleteOff: true,
      label: 'Senha',
      type: 'password'
    }
  ],
  events: [
    {
      id: 'title',
      label: 'Evento',
      required: true
    },
    {
      id: 'permalink',
      label: 'Permalink',
      required: true
    },
    {
      id: 'cover',
      type: 'file',
      required: true,
      label: 'Cover'
    },
    {
      id: 'date',
      type: 'datetime-local',
      parseDefaultValue: s => s && moment(s).format('YYYY-MM-DD[T]HH:mm'),
      label: 'Data'
    },
    {
      id: 'description',
      type: 'editor',
      parseDefaultValue: s => {
        const blocksFromHTML = convertFromHTML(s)
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        return EditorState.createWithContent(state)
      },
      required: true,
      label: 'Descrição'
    },
    {
      id: 'limit',
      label: 'Vagas',
      type: 'number'
    },
    {
      id: 'show',
      label: 'Show',
      type: 'boolean'
    }
  ]
}

export const params = {
  events: {
    sort: '-date'
  },
  guests: {
    populate: 'event'
  },
  users: {
    select: 'email'
  }
}

export const extraMenus = {
  events: [
    {
      link: s => `/api/events/${s._id}/list`,
      text: 'Lista para impressão',
      target: '_blank'
    },
    {
      link: s => `/admin/dashboard/guests?filterResource=event&filterValue=${s._id}&subtitle=${s.party}`,
      text: 'Nomes na lista'
    }
  ]
}

export const columns = {
  images: [
    {
      key: 'file',
      text: s => s.file && <img style={{ maxWidth: '177px' }} src={`/${s.file.path}`} />,
      title: 'Image'
    },
    {
      key: 'home',
      title: 'Escritório',
      text: s => s.home ? <Check /> : <X />
    }
  ],
  users: [
    {
      key: 'email',
      title: 'Username'
    }
  ],
  guests: [
    {
      key: 'event.name',
      title: 'Evento',
      text: s => s.event && s.event.party
    },
    {
      key: 'email',
      title: 'E-mail'
    },
    {
      key: 'name',
      title: 'Nome'
    }
  ],
  events: [
    {
      key: 'title',
      title: 'Evento'
    },
    {
      key: 'guest_count',
      title: 'Nomes'
    },
    {
      key: 'limit',
      title: 'Vagas'
    },
    {
      key: 'cover',
      text: s => s.cover && <img style={{ maxWidth: '100px' }} src={`/${s.cover.path}`} />,
      title: 'Cover'
    },
    {
      key: 'date',
      text: s => moment(s.date).format('DD/MM/YYYY HH:mm'),
      title: 'Data'
    },
    {
      key: 'show',
      title: 'Show',
      text: s => s.show ? <Check /> : <X />
    }
  ]
}
