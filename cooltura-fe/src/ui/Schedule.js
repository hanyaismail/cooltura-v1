import React, {Component} from 'react'; 
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

class Schedule extends Component {
  
  clickHandler = () => {
    console.log('good')
  }

  render() {
    const isMobile = window.innerWidth <= 500;

    if (isMobile) {
      return (
        <div style={{minHeight: 50, borderBottom: '0.5px solid #DCDCDC', margin: '0px 20px'}}>
          <Grid container style={{marginTop: 10}}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h4" style={{marginTop: 5}} align="left" color="primary">
                    03.50
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{position: 'relative', left: '20px'}} alignItems="flex-end">
                  <Switch
                    color="primary"
                    checked={this.props.checked}
                    onChange={this.props.onchange}
                  />
                  <IconButton color="primary" onClick={this.clickHandler}>
                    <Icon>edit_icon</Icon>
                  </IconButton>
                  <IconButton color="primary" onClick={this.clickHandler}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="left">
                Lama Nyala: 50 Detik
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="left">
                Setiap Hari
              </Typography>
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
              <Typography variant="h1">
                Semua hari
              </Typography>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
}

export default Schedule;