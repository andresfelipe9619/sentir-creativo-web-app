import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import Accordion from '@material-ui/core/Accordion'
import Box from '@material-ui/core/Box'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  alpha,
  ThemeProvider,
  makeStyles,
  createTheme
} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import API from '../../api'
import RadioGroup from '../radio'
import { Formik } from 'formik'
import { useTheme } from '@material-ui/styles'

const filters = [
  {
    label: 'Formato',
    name: 'formato',
    service: 'Formato'
  },
  {
    label: 'Técnicas Artísticas',
    name: 'tecnica_artisticas',
    service: 'TecnicaArtistica'
  }
]

export default function Filters ({ children, color }) {
  const classes = useStyles()
  const theme = useTheme()
  const cardColor = color || theme.palette.primary.main

  const handleFormSubmit = () => {}

  const areaTheme = createTheme({
    ...theme,
    palette: {
      primary: { main: cardColor }
    }
  })

  return (
    <ThemeProvider theme={areaTheme}>
      <AppBar position='relative' className={classes.toolbar}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Buscar...'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item md={4}>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={{}}
            validationSchema={{}}
          >
            {({ handleSubmit, ...formikProps }) => {
              return filters.map((f, i) => (
                <FilterOption key={i} {...f} {...formikProps} />
              ))
            }}
          </Formik>
        </Grid>
        <Grid item md={8} component={Box} bgcolor={'#212121'}>
          {children}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

function FilterOption ({ label, name, service, values, errors, handleChange }) {
  const [data, setData] = useState([])
  useEffect(() => {
    ;(async () => {
      let result = await API[service].getAll()
      result = result.map(i => ({ value: i.id, label: i.nombre }))
      setData(result)
    })()
  }, [service])
  return (
    <AccordionOption title={label}>
      <RadioGroup
        name={name}
        options={data}
        values={values}
        errors={errors}
        handleChange={handleChange}
      />
    </AccordionOption>
  )
}

function AccordionOption ({ title, children }) {
  const classes = useStyles()
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        className={classes.accordion}
        expandIcon={<ExpandMoreIcon color='inherit' />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

export const useStyles = makeStyles(theme => ({
  title: { fontWeight: 'bold', fontSize: '24rm' },
  slogan: { fontSize: '24em' },
  toolbar: { background: theme.palette.background.paper },
  accordion: { color: 'white', background: theme.palette.primary.main },
  root: {
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.8),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 1)
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
