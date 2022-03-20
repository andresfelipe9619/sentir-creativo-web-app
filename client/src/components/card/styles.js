import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '10%',
    marginTop: theme.spacing(3),
    marginLeft: '5%',
    overflow: 'visible'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  content: {
    padding: 0,
    width: '100%'
  },
  floatingIcon: {
    border: ({ color }) => [[2, 'solid', color]],
    backgroundColor: 'white'
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
    color: 'white'
  },
  ellipsedHeader: {
    overflow: 'hidden'
  },
  accentText: {
    '&:hover': {
      fontWeight: theme.typography.fontWeightBold
    }
  }
}))

export default useStyles
