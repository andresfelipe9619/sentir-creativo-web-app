import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { useLocation } from 'react-router-dom'
import { Box } from '@material-ui/core'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import clsx from 'clsx'
import { getAreaBackground } from '../../utils'
import Logo from "../../assets/full-logo.png";
import LogoYellow from '../../assets/iso_amarillo.svg'

const ICON_SIZE = "1.6em";

const getYellow = (index) => (index % 2 === 0 ? "#fed901" : "#fff158");

const buttonsStyle = {
  borderRadius: 0,
  height: 64,
  lineHeight: 1.2,
  padding: '16px 24px',
  fontWeight: 700,
  textAlign: 'left',
  textTransform: 'none',
  flex: '1 1 auto',
  justifyContent: 'flex-start',
}
export function MobileAreasButtons ({ areas, goTo, classes }) {
  const { pathname } = useLocation()
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (!pathname.includes("areas")) return;
    let [id] = pathname.split("/").reverse();
    console.log("id", id);
    if (id && +id !== +value) {
      setValue(+id);
    }
  }, [value, pathname]);

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      height="100%"
      alignItems="center"
    >
      <BottomNavigation
        value={value}
        onChange={(_, id) => {
          setValue(id);
          goTo(`/areas/${id}`)();
        }}
        showLabels
        classes={{ root: classes.navigation }}
      >
        {areas.map((area, i) => {
          const selected = area.id === value;
          const style = {
            ...buttonsStyle,
            background: selected ? getAreaBackground(area) : getYellow(i),
            color: selected ? "white" : "#4D4C4C",
            maxWidth: 'none'
          };

          return (
            <BottomNavigationAction
              key={area.id}
              value={area.id}
              style={style}
              label={area.nombre}
              classes={{
                root: classes.buttons,
                selected: classes.navigationButton,
                label: classes.navigationButton,
              }}
              icon={area.icono && <area.icono size={"2em"} style={{ marginRight: 'auto' }} />}
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
}

export function MobileHeader({ areas, classes, goTo }) {
  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, classes.navigation)}
        elevation={0}
      >
        <Toolbar disableGutters style={{ minHeight: 64 }}>
          <Box width="70%" display="flex" height="100%">
            <Button
              fullWidth
              size="large"
              key={"sentircreativo"}
              style={{
                ...buttonsStyle,
                background: "#4E4E4E",
                color: "white",
                padding: 0,
              }}
              startIcon={
                <img src={LogoYellow} width={50} alt="logo sentir creativo" />
              }
              onClick={() => goTo(`/about`)()}
            >
              SentirCreativo.com
            </Button>
          </Box>
          <Box width="30%" display="flex" height="100%">
            <Button
              fullWidth
              key={"quienes somos"}
              classes={{ startIcon: classes.buttons }}
              style={{
                fontSize: 12,
                background: "#363636",
                color: "white",
                ...buttonsStyle,
              }}
              onClick={() => goTo(`/about`)()}
            >
              ¿Quiénes somos?
            </Button>
          </Box>
        </Toolbar>
        <Toolbar
          disableGutters
          classes={{
            root: classes.secondToolbar,
            regular: classes.secondToolbar,
          }}
        >
          <MobileAreasButtons {...{ areas, goTo, classes }} />
        </Toolbar>
      </AppBar>
    </>
  );
}

function AreasButtons({ areas, goTo, classes }) {
  const { pathname } = useLocation();
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (!pathname.includes("areas")) {
      setValue(null);
      return;
    }

    let [id] = pathname.split("/").reverse();

    if (id && +id !== +value) {
      setValue(+id);
    }
  }, [value, pathname]);

  return areas.map((area, i) => {
    const selected = area.id === value;
    const style = {
      ...buttonsStyle,
      background: selected ? getAreaBackground(area) : getYellow(i),
      color: selected ? 'white' : '#4D4C4C'
    }

    const [line1, line2] = area.nombre.split(' ');

    return (
      <Button
        key={area.nombre}
        style={style}
        onClick={() => {
          setValue(area.id);
          goTo(`/areas/${area.id}`)();
        }}
        startIcon={area.icono && <area.icono size={ICON_SIZE} />}
      >
        {line1} <br/> {line2}
      </Button>
    );
  });
}

export function DesktopHeader({ areas, classes, goTo }) {
  return (
    <AppBar position="fixed" className={clsx(classes.appBar)} elevation={0}>
      <Toolbar disableGutters>
        <Box width="100%" display="flex" justifyContent="center">
          <ButtonGroup
            variant="text"
            color="secondary"
            className={classes.navigation}
          >
            <Button
              fullWidth
              onClick={() => goTo(`/`)()}
              classes={{ root: classes.buttons, startIcon: classes.buttons }}
              key={"sentir creativo"}
              style={{ background: "#ffec11", ...buttonsStyle }}
            >
              <img src={Logo} width={180} alt="logo sentir creativo" />
            </Button>

            <AreasButtons {...{ areas, goTo, classes }} />

            <Button
              fullWidth
              size="large"
              key={"quienes somos"}
              style={{
                background: "#ff6c00",
                color: "white",
                ...buttonsStyle,
              }}
              classes={{ startIcon: classes.buttons }}
              onClick={() => goTo(`/about`)()}
              endIcon={<WbSunnyIcon style={{ fontSize: ICON_SIZE }} />}
            >
              ¿Quiénes <br /> somos?
            </Button>
          </ButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
