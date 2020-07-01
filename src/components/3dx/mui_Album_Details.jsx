import { red } from "@material-ui/core/colors";
export const albumDetailsStyle = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },

  root: {
    maxWidth: "100%",
    minWidth: "100%",
    backgroundColor: "#0f161c",
    height: "900px",
    overflow: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  List: {
    padding: "1px",
  },
  ListItem: { padding: "1px" },

  ListItemIcon: { fontSize: "24px" },

  ListItemText: {
    textTransform: "none",
    marginTop: "2.5px",
    marginRight: "2.5px",
  },
  LoveCardContent: {
    display: "flex",
    justifyContent: "center",
    margin: "1px",
    padding: "1px",
  },
  EditModeIconButton: {
    marginTop: "1px",
    marginLeft: "10px",
    padding: "5px",
    fontSize: "20px",
  },
  EditModeIconButton4details: {
    marginTop: "1px",
    marginLeft: "10px",
    padding: "5px",
    fontSize: "20px",
  },
  EditModeEditIcon: {
    fontSize: "17px",
  },
  EditModeDeleteHover: {
    textTransform: "none",
    marginTop: "2.5px",
    marginRight: "2.5px",
    "&:hover": {
      color: "red",
    },
  },
  PopOver: {
    width: "125px",
    height: "100px",
    padding: "10px",
  },
  ListItemPop: {
    margin: "15px",
    padding: "5px",
    height: "25px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#0f161c",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "400px",
    width: "400px",
  },
});
