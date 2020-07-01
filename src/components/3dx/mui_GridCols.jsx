import { isWidthUp } from "@material-ui/core/withWidth";

export const getGridListCols = (width) => {
  if (isWidthUp("xl", width)) {
    return 5;
  } else if (isWidthUp("lg", width)) {
    return 4;
  } else if (isWidthUp("md", width)) {
    return 3;
  } else if (isWidthUp("sm", width)) {
    return 2;
  } else if (isWidthUp("xs", width)) {
    return 1;
  }
};
