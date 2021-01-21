import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "15px",
    overflow: "hidden",
    display: "grid"
  }
}));

const client = createClient({
  url: 'https://react.eogresources.com/graphql'
});

const LastKnownMeasurement = props => {

  const [measurement, setMeasurement] = React.useState([]);

  const classes = useStyles();

  const query = `
		query ($metricName: String!) {
		  getLastKnownMeasurement(metricName: $metricName) {
		    metric
		    value
		    unit
		    at
		  }
		}
		`;

  const dispatch = useDispatch();

  const [result, executeQuery] = useQuery({
    query,
    variables: {
      metricName: props.metricName
    }
  });

  const { data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({
        type: actions.API_ERROR,
        error: error.message
      });
      return;
    }
    if (!data) return;

    setMeasurement(data.getLastKnownMeasurement);
    const interval = setInterval(() => {
        executeQuery({ requestPolicy: "network-only" });
      setMeasurement(data.getLastKnownMeasurement);
    }, 1500);
    return () => clearInterval(interval);
  }, [dispatch, data, error, executeQuery]);
    
  return (
      <Paper className={classes.root} style={{margin:"15px", minWidth: "42%", maxWidth: "43%"}}>
      <Typography variant="h5" style={{fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.6, letterSpacing: "0.0075em"}}>
          {props.metricName}
        </Typography>
        <Typography component="h3" style={{fontSize:"50px", fontWeight: "400"}}>
          {props.metricName
            ? `${measurement.value}`
            : null}
        </Typography>
      </Paper>
  );
};

export default props => {
  return (
    <Provider value={client}>
      <LastKnownMeasurement {...props} />
    </Provider>
  );
};

