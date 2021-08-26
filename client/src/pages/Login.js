import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import API from '../api'
import { Formik } from 'formik'
import * as yup from 'yup'

function Copyright () {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const schema = yup.object().shape({
  identifier: yup.string().email(),
  password: yup.string().required()
})

const initialValues = {
  identifier: '',
  password: ''
}

export default function SignInSide () {
  const classes = useStyles()
  const history = useHistory()
  const handleFormSubmit = async values => {
    try {
      const result = await API.Auth.login(values)
      console.log(`result`, result)
      API.setToken(result.jwt)
      history.push('/admin/audiencia')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={schema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='identifier'
                  label='Email Address'
                  name='identifier'
                  autoComplete='email'
                  autoFocus
                  disabled={isSubmitting}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.identifier}
                  error={!!touched.identifier && !!errors.identifier}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  disabled={isSubmitting}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={!!touched.password && !!errors.password}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='#' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      to='/register'
                      component={RouterLink}
                      variant='body2'
                      onClick={e => e.stopPropagation()}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  )
}
