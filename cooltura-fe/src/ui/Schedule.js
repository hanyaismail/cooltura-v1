import React, {Component} from 'react'; 
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

class Schedule extends Component {
  render() {
    const isMobile = window.innerWidth <= 500;

    if (isMobile) {
      return (
        <div style={{minHeight: 50, borderBottom: '0.5px solid #DCDCDC', margin: '0px 20px'}}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container >
                <Grid item xs={6}>
                  03.50
                </Grid>
                <Grid item xs={6}>
                  Tombol
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              Semua hari
            </Grid>
          </Grid>
        </div>
      )
    } else {
      return (
        <div style={{width: '50%', border: '2', background: 'red'}}>
          <Grid container>
            <Grid item md={12}>
              <Grid container >
                <Grid item md={6}>
                  03.50
                </Grid>
                <Grid item md={6}>
                  Tombol
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              Semua hari
            </Grid>
          </Grid>
        </div>
      )
    }
  }
}

export default Schedule;