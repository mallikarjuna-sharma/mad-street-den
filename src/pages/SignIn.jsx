import {
  getlocalStorage,
  setlocalStorage,
  SIGNED_IN_USER,
  SIGNED_UP_USERS,
} from "../utils";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [signInData, setSignInData] = React.useState({});

  const classes = useStyles();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(signInData, "signInData");

    const signedUpUsers = getlocalStorage(SIGNED_UP_USERS);

    // check any user added to storage
    if (signedUpUsers) {
      // user already signed IN
      if (signedUpUsers[signInData.username]) {
        console.log("signed in success");
        setlocalStorage(SIGNED_IN_USER, signInData.username);
        const ele = document.createElement("a");
        ele.href = "/app";
        ele.click();
      } else {
        alert("No registered User found");
      }
    } else {
      alert("No registered User found");
    }
  };

  const handleFieldChange = (e) => {
    setSignInData((preData) => {
      preData[e.target.name] = e.target.value;
      return preData;
    });
  };

  const signed_in_user = getlocalStorage(SIGNED_IN_USER);

  if (signed_in_user) {
    return <Redirect to="/app" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={handleFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleFieldChange}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleFormSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
