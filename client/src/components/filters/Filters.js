import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import Accordion from '@material-ui/core/Accordion'
import Chip from '@material-ui/core/Chip'
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
import { CheckboxGroup } from '../radio'
import { useTheme } from '@material-ui/styles'

export default function Filters ({
  children,
  color,
  data = [],
  filterOptions,
  onFilterChange
}) {
  const classes = useStyles()
  const theme = useTheme()
  const [values, setValues] = useState({})
  const [filters, setFilters] = useState({})
  const cardColor = color || theme.palette.primary.main

  const handleChangeFilter = e => {
    const { name, value, checked } = e.target

    const newValues = {
      ...values,
      [name]: { ...values[name], [value]: checked }
    }
    setValues(newValues)
    const selectedFilters = getSelectedFilters(newValues)
    setFilters(selectedFilters)
    onFilterChange(selectedFilters)
  }

  const areaTheme = createTheme({
    ...theme,
    palette: {
      primary: { main: cardColor }
    }
  })
  console.log('filters', filters)
  const chips = filterOptions
    .map(fo => {
      console.log('fo', fo)
      if (fo.name === 'formato') {
        return (fo.options || []).filter(o =>
          (filters.formats || []).includes(+o.value)
        )
      }
      if (fo.name === 'tecnica_artisticas') {
        return (fo.options || []).filter(o =>
          (filters.tecnics || []).includes(+o.value)
        )
      }
      return []
    })
    .flatMap(f => f)
  console.log('chips', chips)
  return (
    <ThemeProvider theme={areaTheme}>
      <AppBar position='relative' classes={{ root: classes.toolbar }}>
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
          <Box className={classes.chips}>
            {(chips || []).map(option => {
              return <Chip key={option.label} label={option.label} />
            })}
          </Box>
        </Toolbar>
        <Toolbar>
          <Grid item md={3}></Grid>
          <Grid
            item
            md={4}
            style={{ backgroundColor: areaTheme.palette.primary.main }}
          >
            {(data || []).length} experiencias encontradas:
          </Grid>
          <Grid item md={5}></Grid>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item md={3}>
          {filterOptions.map((fo, i) => (
            <FilterOption
              key={i}
              {...fo}
              handleChange={handleChangeFilter}
              values={values[fo.name] || {}}
            />
          ))}
        </Grid>
        <Grid item md={9} component={Box} bgcolor={'#212121'} pt={2}>
          {children}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

function FilterOption ({ label, name, options, values, handleChange }) {
  return (
    <AccordionOption title={label}>
      <CheckboxGroup
        name={name}
        options={options}
        values={values}
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

function getSelectedFilters (filters) {
  let formats = Object.entries(filters.formato || {})
    .filter(([, value]) => !!value)
    .map(([key]) => +key)
  let tecnics = Object.entries(filters.tecnica_artisticas || {})
    .filter(([, value]) => !!value)
    .map(([key]) => +key)

  return { formats, tecnics }
}

export const useStyles = makeStyles(theme => ({
  title: { fontWeight: 'bold', fontSize: '24rm' },
  slogan: { fontSize: '24em' },
  toolbar: { background: theme.palette.background.paper, zIndex: 1 },
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
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}))
