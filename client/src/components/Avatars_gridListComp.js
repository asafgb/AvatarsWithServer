import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import MyClickable from './Avatars_CostumeButton'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import testsplist from '../utilities/TestSPListOfPictures.json' 
import ButtonBase from '@material-ui/core/ButtonBase';
import Save from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import CircularProgress from './Avatars_CircularIndeterminate'
const styles = theme => ({
  root: {
    //display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  button:{
    cursor: 'pointer',
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#002f00',//theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  images:{
    //width: '300px',
    //height: '300px',
  },
  image: {
    position: 'relative',
    //height: 200,
    [theme.breakpoints.down('xs')]: {
      //width: '100% !important', // Overrides inline-style
     // height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  PicSelected:{
      backgroundColor: 'red',
  },
  buttons: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  icon:{
    width: '36px',
    height:'36px',
  },
  Bigicon:{
    width: '72px',
    height:'72px',
  }
});

class GridListComp extends React.Component {

  constructor(){
    super();
    this.state={
      activeIndex: -1,
      costumer: []
    }
  }
  state = {
    activeIndex: -1,
    costumer: []
  }
  
  
  sendSave(index)
  {
    switch(index)
    {
      case 'save':
      fetch("/api/Save", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

    //make sure to serialize your JSON body
    body: JSON.stringify({
    Mod:"save",
    itemId:this.state.activeIndex
    })
  })
  .then(res =>res.json())
  .then(json => alert(json.message))
        break;

      case 'nic':
      fetch("/api/Save", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
  
      //make sure to serialize your JSON body
      body: JSON.stringify({
      Mod:"Name",
      })
    })
    .then(res =>res.json())
    .then(json => alert(json.message))
        break;

      case 'default':
      fetch("/api/Save", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
  
      //make sure to serialize your JSON body
      body: JSON.stringify({
      Mod:"Def",
      })
    })
    .then(res =>res.json())
    .then(json => alert(json.message))
        break;
    }
    //fetch('/api/Check')
    //.then(res=>res.json()
    //.then(costumer => this.setState({costumer}, ()=> console.log('loaded',costumer)));
  }

  
  async componentWillMount()
  {
    let  json =  await this.getMoviesFromApiAsync();
    //this.state.costumer =json// this.getMoviesFromApiAsync();
    this.setState({costumer: json})
    //this.state.costumer = this.getMoviesFromApiAsync();
    //console.log(this.state.costumer); 
  }
  
  

  
   getMoviesFromApiAsync() {
     return fetch('https://api.myjson.com/bins/t97a2')
    .then((response) => response.json())
    .then(json =>{
      //console.log(json)
     return json;
    })
    .catch((error) => { 
      console.error(error);
    });
    ;
 }

  handleClick = (index) => {
    this.setState({ activeIndex: index })
    console.log(index);
}

  render() {
    const { classes } = this.props;
    const usersList = this.state.costumer;
    let usersListBlock = '';
    
    return (
    <div className={classes.root} id="AllImages">
     {
       (!(usersList && usersList.length >0))  &&(
       <CircularProgress  />
       )
     }
     
      <GridList cols={5} spacing={10}  cellHeight={300} style={{ margin: '0px' }}>
        {
        /*  testsplist.map((tile,i) => (
          <GridListTile key={i} index={i} alt={tile.category} onClick={() => this.handleClick(i) } className={classNames(classes.button, this.state.activeIndex===i && classes.PicSelected)}  >
            <img src={tile.path.includes("http") ? tile.path : process.env.PUBLIC_URL + tile.path} className={classes.images}  />
          </GridListTile>
          
          
        ))*/
    
        usersList && usersList.length >0 && usersList.map( obj => (
        //usersListBlock += //"<div>"+obj.title+"</div>"
        <GridListTile key={obj.id} index={obj.id} alt={obj.category} onClick={() => this.handleClick(obj.id) } className={classNames(classes.button, this.state.activeIndex===obj.id && classes.PicSelected)}  >
            <img src={obj.path.includes("http") ? obj.path : process.env.PUBLIC_URL + obj.path} className={classes.images}  />
        </GridListTile>
      ))
        }
      </GridList>
      {/* <form method="post" action="/api/Check">
      <input type="button"> */}
         <Button className={classes.buttons} onClick={() => { this.sendSave('default');}} variant="raised"  style={{ backgroundColor: '#21d38f', color:'White' }}>
        <img src={ process.env.PUBLIC_URL + '/images/images/active.svg'} className={classNames(classes.leftIcon,classes.icon)} />
        Defualt
      </Button>
      {/* </input> */}

      <Button onClick={() => { this.sendSave('nic');}} className={classes.buttons} variant="raised"  style={{ backgroundColor: 'orange', color:'White' } }>
        <img src={ process.env.PUBLIC_URL + '/images/images/name.svg'} className={classNames(classes.leftIcon,classes.icon)} />
        NameinColor
      </Button>
      
      {/* <Button className={classes.buttons} variant="raised"  style={{ backgroundColor: 'Blue', color:'White' }}>
        <img src={ process.env.PUBLIC_URL + '/images/images/reset.svg'} className={classNames(classes.leftIcon,classes.icon)} />
        Reset
      </Button> */}

      <Button className={classes.buttons} variant="raised" color="primary" onClick={() => { this.sendSave('save');}} >
      <Save className={classNames(classes.leftIcon,classes.icon)}  />
        Save
      </Button> 
      {/* </form> */}

      {/* {usersListBlock} */}
    </div>
    );
  }
}
export default withStyles(styles)(GridListComp);
