import * as React from 'react';
import { useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExploreIcon from '@mui/icons-material/Explore';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './home.css';
import { Card, CardMedia } from '@mui/material';
import pie from '../../Assests/pie.png'
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenseByDate } from '../../store/ExpenseSlice';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function getDate() {
    const today = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month} ${date}, ${year}`;
  }

  const [currentDate, setCurrentDate] = React.useState(getDate());

  const dispatch = useDispatch()
  const{expenses} = useSelector((state)=>state.expenses)

  useEffect(()=>{
    dispatch(fetchExpenseByDate())
  },[])



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1)
        const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
 
  const totalExpense = Array.isArray(expenses)
  ? expenses.reduce((acc, curr) => acc + curr.amount, 0)
  : 0;
  console.log(totalExpense)
  return (
  
     
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} className='main' >
        <DrawerHeader />
        <Box className='maincomponent'>
          <Box className='leftcomponent'>
          <Typography className='head'>
          <Typography>Daily Expenses </Typography>
          <Typography>{currentDate}</Typography>
          <Card   className='card-img'>
          <CardMedia
          component="img"
          height="140"
          image={pie}
          className='pie-img'
        />
          <CardContent className='card-txt'>
          <Typography   component="div" className='outcome'>
            Outcome - {currentDate}
          </Typography>
          <Typography  variant="h6" className='outcome'>
          $ {totalExpense}
          </Typography>
        </CardContent>
          </Card>
        </Typography>
          </Box>
          <Box className='rightcomponent'>
            <Typography > Todays Transactions</Typography>
              <Box className='t-list'>
                {
                 Array.isArray(expenses)? expenses.map((val)=>{
                    return(
                      <List key={val._id} className='single-transaction'>
                        <ListItem>{val.category}</ListItem>
                        <ListItem> ${val.amount}</ListItem>
                        <ListItem>{formatDate(val.date)}</ListItem>
                        
                      </List>
                    )
                  }):
                  <Typography>No Expenses</Typography>
                }
              </Box>
          </Box>
        </Box>

      </Box>
    
  );
}
