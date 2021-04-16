import { Grid, Paper, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import {
  getlUrlPaths,
  getlocalStorage,
  setlocalStorage,
  SIGNED_IN_USER,
  FOLDER_JSON,
} from "../utils";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseIcon from "@material-ui/icons/Close";
import FileTree from "./FileTree";
import FolderView from "../pages/FolderView";
import LaunchIcon from "@material-ui/icons/Launch";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MinimizeIcon from "@material-ui/icons/Minimize";
import SendIcon from "@material-ui/icons/Send";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import image8 from "../assets/8.jpg";
import { withStyles } from "@material-ui/core/styles";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [createNewFolder, setCreateNewFolder] = React.useState(false);

  const [FileExplorer, setFileExplorer] = React.useState();
  const [signedUser, setSignedInUser] = React.useState("");
  const [IsMaxView, setIsMaxView] = React.useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("signedInUser");
    let element = document.createElement("a");
    element.href = "/SignIn";
    element.click();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateNewFolder = () => {
    setCreateNewFolder(true);
    handleClose();
  };

  useEffect(() => {
    const data = getlocalStorage(FOLDER_JSON);
    const signedInUser = getlocalStorage(SIGNED_IN_USER);
    setSignedInUser(signedInUser);
    if (!data) {
      setFileExplorer({ [signedInUser]: { app: {} } });
      setlocalStorage(FOLDER_JSON, { [signedInUser]: { app: {} } });
    } else {
      if (!data[signedInUser]) {
        setlocalStorage(FOLDER_JSON, { ...data, [signedInUser]: { app: {} } });
        setFileExplorer({ ...data, [signedInUser]: { app: {} } });
      } else {
        setFileExplorer(data);
      }
    }
  }, []);

  const hanldeCreateNewFolder = (newFolderName) => {
    const paths = getlUrlPaths();
    let result = "";
    setFileExplorer((preFileExplorer) => {
      const preFileExplorerForUser = preFileExplorer[signedUser];

      for (let i = 0; i < paths.length; ++i) {
        if (result) {
          result = result[paths[i]];
        } else {
          result = preFileExplorerForUser[paths[i]];
        }
      }
      result = Object.assign(result, { [newFolderName]: {} });

      setlocalStorage(FOLDER_JSON, {
        ...preFileExplorer,
        [signedUser]: preFileExplorerForUser,
      });

      return {
        ...preFileExplorer,
        [signedUser]: preFileExplorerForUser,
      };
    });

    setCreateNewFolder(false);
  };

  const handleDeleteFolderClick = (selectedFolder, setAnchorEl, type = 0) => {
    const paths = getlUrlPaths();
    let result = "";
    setFileExplorer((preFileExplorer) => {
      const preFileExplorerForUser = preFileExplorer[signedUser];

      for (let i = 0; i < paths.length; ++i) {
        if (result) {
          result = result[paths[i]];
        } else {
          result = preFileExplorerForUser[paths[i]];
        }
      }
      delete result[selectedFolder];
      setlocalStorage(FOLDER_JSON, {
        ...preFileExplorer,
        [signedUser]: preFileExplorerForUser,
      });
      setAnchorEl(null);

      return {
        ...preFileExplorer,
        [signedUser]: preFileExplorerForUser,
      };
    });

    if (type) setCreateNewFolder(true);
  };

  const Header = () => (
    <Grid
      style={{
        height: "5%",
        backgroundColor: "dodgerblue",
      }}
    ></Grid>
  );

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        zIndex: 1,
        position: "absolute",
      }}
    >
      <Paper
        elevation={4}
        style={
          !IsMaxView
            ? {
                height: "90%",
                width: "95%",
                margin: "1% 0% 0% 1%",
                position: "relative",
                background: "rgba(225, 225, 225, 0.5)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                overflow: "hidden",
              }
            : {
                height: "100%",
                width: "100%",
                position: "relative",
                background: "rgba(225, 225, 225, 0.5)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                overflow: "hidden",
              }
        }
        onContextMenu={handleClick}
      >
        <Grid
          item
          style={{
            position: "absolute",
            top: 1,
            left: 1,
          }}
        >
          <ArrowBackIcon
            onClick={(e) => window.history.back()}
            className="cursorPointer"
          />
        </Grid>
        <Grid
          item
          style={{
            position: "absolute",
            top: 1,
            left: 40,
          }}
        >
          <ArrowForwardIcon
            onClick={(e) => window.history.forward()}
            className="cursorPointer"
          />
        </Grid>

        <Grid
          item
          style={{
            position: "absolute",
            top: 1,
            right: 1,
          }}
        >
          <CloseIcon onClick={handleLogout} className="cursorPointer" />
        </Grid>
        <Grid
          item
          style={{
            position: "absolute",
            top: 1,
            right: 40,
          }}
          onClick={(e) => setIsMaxView((preValue) => !preValue)}
        >
          <LaunchIcon className="cursorPointer" />
        </Grid>
        <Grid
          item
          style={{
            position: "absolute",
            top: -0,
            right: 80,
          }}
        >
          <MinimizeIcon className="cursorPointer" />
        </Grid>

        <Header />
        <Grid
          container
          style={{ height: "100%", width: "100%" }}
          direction="row"
        >
          <FileTree
            FileExplorer={FileExplorer && { ...FileExplorer[signedUser] }}
          />

          <FolderView
            hanldeCreateNewFolder={hanldeCreateNewFolder}
            handleDeleteFolderClick={handleDeleteFolderClick}
            isCreateNewFolder={createNewFolder}
            FileExplorer={
              (FileExplorer && { ...FileExplorer[signedUser] }) || []
            }
          />
        </Grid>

        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={handleCreateNewFolder}>
            <ListItemIcon>
              <SendIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Create Folder" />
          </StyledMenuItem>
        </StyledMenu>
      </Paper>
    </div>
  );
}
