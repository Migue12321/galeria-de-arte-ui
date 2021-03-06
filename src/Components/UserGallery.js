import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UploadImageForm from './Forms/UploadImageForm'
import Gallery from './Gallery/Gallery';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function UserGallery(props) {
  const classes = useStyles();
	
  return (
    <div className={classes.root}>
			<Typography variant="h3">Administrador</Typography>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Subir Nueva Imagen</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
				<UploadImageForm/>

        </ExpansionPanelDetails>
      </ExpansionPanel>
			<Gallery paints={props.paints} cards={props.cards}></Gallery>
      
    </div>
  );
}