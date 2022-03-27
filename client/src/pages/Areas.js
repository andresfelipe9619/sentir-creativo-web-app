import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { alpha, makeStyles } from '@material-ui/core/styles'
import API from '../api'
import Card from '../components/card/ServiceCard'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import ServicioModal from '../components/modals/ServicioModal'
import DossierModal from '../components/modals/DossierModal'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Spinner from '../components/spinner/Spinner'
import { getAreaBackground } from '../utils'
import Filters from '../components/filters/Filters'

function useQuery () {
  return new URLSearchParams(useLocation().search)
}

const map2select = ([value, label]) => ({ label, value })

export default function Areas () {
  const [services, setServices] = useState([])
  const [formats, setFormats] = useState([])
  const [tecnics, setTecnics] = useState([])
  const [filters, setFilters] = useState({})
  const [selectedService, setSelectedService] = useState(null)
  const [selectedArea, setSelectedArea] = useState(null)
  const [showDossier, setShowDossier] = useState(false)
  const history = useHistory()
  const query = useQuery()
  const [loading, setLoading] = useState(false)
  const { id: areaId } = useParams()
  const selectedId = query.get('service')
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))
  const classes = useStyles()

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const serviceResult = await API.Servicio.getAll({
          params: { area: areaId, 'estado.id': 12 }
        })
        const areaResult = await API.Area.get(areaId)
        setSelectedArea(areaResult)
        // Find unique tecnics and formats for the filter's options
        const { formats: formatos, tecnics: tecnicas } = serviceResult.reduce(
          (acc, s) => {
            const mTecnics = s.tecnica_artisticas
              .filter(t => !acc.tecnics[t.id])
              .reduce((accT, t) => ({ ...accT, [t.id]: t.nombre }), acc.tecnics)

            const mFormats = s.formatos
              .filter(f => !acc.formats[f.id])
              .reduce((accF, f) => ({ ...accF, [f.id]: f.nombre }), acc.formats)

            return {
              formats: mFormats,
              tecnics: mTecnics
            }
          },
          {
            formats: {},
            tecnics: {}
          }
        )
        setFormats(formatos)
        setTecnics(tecnicas)
        setServices(serviceResult)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [areaId])

  useEffect(() => {
    if (!services) return

    if (!selectedService && selectedId) {
      let found = services.find(s => +s.id === +selectedId)
      found && setSelectedService(found)
    }
  }, [services, selectedService, selectedId])

  const handleOpenModal = service => () => {
    history.push({ search: `?service=${service.id}` })
  }

  const handleCloseModal = () => {
    history.push({ search: '' })
    setSelectedService(null)
  }

  const handleOpenDossier = service => () => {
    setSelectedService(service)
    setShowDossier(true)
  }

  const handleCloseDossier = () => {
    setShowDossier(false)
    setSelectedService(null)
  }

  const length = isSmall ? 1 : isMedium ? 2 : 3
  if (loading) return <Spinner />
  if (!selectedArea) return null

  const color = selectedArea.colorPrimario
  const mustFilter = filters?.tecnics?.length || filters?.formats?.length

  const servicesToShow = mustFilter
    ? filterServices(services, filters)
    : services

  return (
    <Grid
      pt={4}
      px={0}
      container
      justifyContent='center'
      component={Box}
      style={{
        background: getAreaBackground(selectedArea),
        color: 'white'
      }}
    >
      <DossierModal
        open={!!showDossier}
        handleClose={handleCloseDossier}
        service={selectedService}
      />
      <ServicioModal
        open={!!selectedId}
        handleClose={handleCloseModal}
        service={selectedService}
      />
      <Grid item sm={12} md={6} component={Box} py={4} textAlign="center">
        <Typography
          variant='h1'
          align='center'
          component='strong'
          gutterBottom
          style={{ color: 'white', backgroundColor: color, padding: '0 1rem' }}
        >
          {selectedArea.nombre.toUpperCase()}
        </Typography>
        <Typography
          paragraph
          gutterBottom
          align='center'
          className={classes.titleAccent}
        >
          {selectedArea.slogan.split(' ').map((x, i) => {
            const sloganStyle = {
              fontWeight: i === 0 ? '300' : '900',
              fontSize: 64,
              lineHeight: 1.15,
              textShadow: 'rgba(255 255 255 / 60%) -4px 4px 4px'
            }

            return <Typography style={sloganStyle}>{x}</Typography>
          })}
        </Typography>
      </Grid>
      <Filters
        color={color}
        data={servicesToShow}
        onFilterChange={setFilters}
        filterOptions={[
          {
            label: 'Formato',
            name: 'formato',
            options: Object.entries(formats).map(map2select)
          },
          {
            label: 'Técnicas Artísticas',
            name: 'tecnica_artisticas',
            options: Object.entries(tecnics).map(map2select)
          }
        ]}
      >
        <Grid container component={Box} my={0} m={0} p={0} alignItems='center'>
          {servicesToShow.map(s => (
            <Grid
              xs={12 / length}
              md={4}
              xl={3}
              component={Box}
              m={0}
              p={0}
              item
              key={s.id}
            >
              <Card
                service={s}
                color={color}
                handleClickPrimary={handleOpenModal(s)}
                handleClickSecundary={handleOpenDossier(s)}
              />
            </Grid>
          ))}
        </Grid>
      </Filters>
    </Grid>
  )
}

function filterServices (services = [], filters = {}) {
  return services.filter(s => {
    let pass = s.tecnica_artisticas.some(t =>
      (filters?.tecnics || []).includes(t.id)
    )
    if (pass) return pass
    return s.formatos.some(t => (filters?.formats || []).includes(t.id))
  })
}

export const useStyles = makeStyles(theme => ({
  titleAccent: {
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
    textShadow: '4px 4px 2px ' + theme.palette.grey[600],
    fontSize: '48px',
    [theme.breakpoints.down('md')]: {
      fontSize: '38px'
    }
  },
  slogan: { fontSize: '24em' },
  root: {
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))
