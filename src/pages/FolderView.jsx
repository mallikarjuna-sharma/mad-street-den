import {
  Grid,
  GridList,
  Input,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef } from "react";

import Button from "@material-ui/core/Button";
import DraftsIcon from "@material-ui/icons/Drafts";
import FolderIcon from "@material-ui/icons/Folder";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SendIcon from "@material-ui/icons/Send";
import { getlUrlPaths } from "../utils";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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

export default function FolderView({
  FileExplorer = [],
  isCreateNewFolder = false,
  hanldeCreateNewFolder,
  handleDeleteFolderClick,
}) {
  const [folders, setFolders] = React.useState(["App"]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rightClickedFolder, setRightClickedFolder] = React.useState(null);

  const newFolderName = useRef("");

  const handleFolderClick = (selectedFolder) => {
    let element = document.createElement("a");
    element.href = window.location.pathname + "/" + selectedFolder;
    element.click();
  };

  useEffect(() => {
    if (isCreateNewFolder) {
      let input = document.getElementById("newfolderId");

      document.getElementById("newfolderId").focus();

      input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          hanldeCreateNewFolder(newFolderName.current);
        }
      });
    }
    return () => {
      document
        .getElementById("newfolderId")
        ?.removeEventListener("keyup", () => {});
    };
  }, [isCreateNewFolder]);

  useEffect(() => {
    if (FileExplorer) {
      const paths = getlUrlPaths();
      let result = false;

      for (let i = 0; i < paths.length; ++i) {
        if (result) {
          result = result[paths[i]];
        } else {
          result = FileExplorer[paths[i]];
        }
      }
      if (result) {
        setFolders(Object.keys(result));
      } else {
        setFolders([]);
      }
    }
  }, [FileExplorer]);

  const handleContextClick = (event, folder) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setRightClickedFolder(folder);
  };

  return (
    <Grid item style={{ paddingLeft: "5%" }}>
      <Grid container direction="row" style={{ height: "100%", width: "100%" }}>
        {folders.map((folder) => {
          return (
            <Grid item className="cursorPointer">
              <Grid
                container
                direction="column"
                alignItems="center"
                onContextMenu={(e) => handleContextClick(e, folder)}
              >
                <Grid onClick={() => handleFolderClick(folder)}>
                  <Tooltip
                    title={
                      <span>
                        <p>Click to Open</p>
                        <p>Right Click to Edit</p>
                      </span>
                    }
                  >
                    <div>
                      <FolderIcon style={{ color: "#FFE9A2", fontSize: 100 }} />
                      <Typography> {folder}</Typography>
                    </div>
                  </Tooltip>
                </Grid>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={(e) => setAnchorEl(false)}
                >
                  <StyledMenuItem
                    onClick={(e) =>
                      handleDeleteFolderClick(
                        rightClickedFolder,
                        setAnchorEl,
                        1
                      )
                    }
                  >
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit Folder" />
                  </StyledMenuItem>
                  <StyledMenuItem
                    onClick={(e) =>
                      handleDeleteFolderClick(rightClickedFolder, setAnchorEl)
                    }
                  >
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete Folder" />
                  </StyledMenuItem>
                </StyledMenu>
              </Grid>
            </Grid>
          );
        })}
        {isCreateNewFolder && (
          <Grid item className="cursorPointer">
            <Grid
              container
              direction="column"
              alignItems="center"
              onContextMenu={handleContextClick}
            >
              <Grid>
                <FolderIcon
                  style={{ color: "#FFE9A2", fontSize: 100, opacity: 0.5 }}
                />
                <Grid item>
                  <input
                    id="newfolderId"
                    style={{ order: "none", outline: "none" }}
                    placeholder="New Folder"
                    onChange={(e) => (newFolderName.current = e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        {!folders.length && (
          <Typography
            style={{
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.6)",
            }}
          >
            Right Click to Create New Folder
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
