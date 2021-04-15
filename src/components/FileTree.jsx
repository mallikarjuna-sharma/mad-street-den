import { Grid, Typography } from "@material-ui/core";
import React, { Component, useEffect, useState } from "react";

import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import { getlUrlPaths } from "../utils";

const FileTree = ({ FileExplorer = {} }) => {
  const [currentNode, setNode] = useState(null);

  const paths = getlUrlPaths();

  useEffect(() => {
    if (paths?.length && FileExplorer && FileExplorer[paths[0]]) {
      let currentNode = FileExplorer;
      let designNode = [];
      paths?.forEach((path, Pathindex) => {
        currentNode = currentNode[path];

        designNode.push(
          <Grid item style={{ marginLeft: Pathindex * 20 }}>
            <Grid container direction="row">
              <FolderOpenIcon />
              <Typography>{path}</Typography>
            </Grid>
          </Grid>
        );

        if (Pathindex === paths.length - 1) {
          designNode.push(
            Object.keys(currentNode).map((currentFolders) => {
              return (
                <Grid item style={{ marginLeft: Pathindex * 40 }}>
                  <Grid container direction="row">
                    <FolderOpenIcon />
                    <Typography>{currentFolders}</Typography>
                  </Grid>
                </Grid>
              );
            })
          );
        }
      });

      setNode(designNode);
    }
  }, [FileExplorer, paths]);

  return (
    <Grid
      item
      style={{
        boxShadow: "black 0px 5px 16px 1px",
        minWidth: "15%",
        maxWidth: "20%",
        padding: "2%",
      }}
    >
      <Grid container direction="column">
        {currentNode}
      </Grid>
    </Grid>
  );
};

export default FileTree;
