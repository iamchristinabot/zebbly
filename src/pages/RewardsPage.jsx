import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HistoryIcon from '@mui/icons-material/History';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { StoreContext } from '../stores/storeContext';
import Header from '../components/Header';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`rewards-tabpanel-${index}`}
      aria-labelledby={`rewards-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const BadgeCard = ({ badge }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Card 
        elevation={0} 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: `1px solid ${theme.palette.brand.lightGray}`,
          borderRadius: 2,
          opacity: badge.earned ? 1 : 0.6,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[2]
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
          <Box 
            sx={{ 
              fontSize: '3rem', 
              mb: 2,
              bgcolor: badge.earned ? theme.palette.brand.lightTeal : theme.palette.action.disabledBackground,
              width: 80,
              height: 80,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {badge.icon}
          </Box>
          <Typography variant="h6" component="div" align="center" gutterBottom>
            {badge.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {badge.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', p: 2 }}>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => setOpen(true)}
          >
            Details
          </Button>
        </CardActions>
      </Card>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Badge Details: {badge.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Box 
              sx={{ 
                fontSize: '4rem', 
                mb: 2,
                bgcolor: badge.earned ? theme.palette.brand.lightTeal : theme.palette.action.disabledBackground,
                width: 100,
                height: 100,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {badge.icon}
            </Box>
            <Chip 
              label={badge.earned ? "Earned" : "Not Earned"} 
              color={badge.earned ? "success" : "default"}
            />
          </Box>
          <Typography variant="body1" paragraph>
            {badge.description}
          </Typography>
          {!badge.earned && (
            <Typography variant="body2" color="text.secondary">
              Complete the required actions to earn this badge and get 50 points!
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const RewardCard = ({ reward, onRedeem }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { rewardsStore } = useContext(StoreContext);
  const canRedeem = rewardsStore.totalPoints >= reward.cost;
  
  const handleRedeem = () => {
    onRedeem(reward.id);
    setOpen(false);
  };
  
  return (
    <>
      <Card 
        elevation={0} 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: `1px solid ${theme.palette.brand.lightGray}`,
          borderRadius: 2,
          opacity: canRedeem ? 1 : 0.7,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: canRedeem ? 'translateY(-4px)' : 'none',
            boxShadow: canRedeem ? theme.shadows[2] : 'none'
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
          <Box 
            sx={{ 
              fontSize: '3rem', 
              mb: 2,
              bgcolor: theme.palette.brand.lightTeal,
              width: 80,
              height: 80,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {reward.icon}
          </Box>
          <Typography variant="h6" component="div" align="center" gutterBottom>
            {reward.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" paragraph>
            {reward.description}
          </Typography>
          <Chip 
            label={`${reward.cost} points`} 
            color="primary"
            variant="outlined"
          />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', p: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            disabled={!canRedeem}
            onClick={() => setOpen(true)}
          >
            Redeem
          </Button>
        </CardActions>
      </Card>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Redeem Reward</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {reward.name} ({reward.cost} points)
          </Typography>
          <Typography variant="body1" paragraph>
            {reward.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to redeem this reward? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleRedeem}>
            Confirm Redemption
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const RewardsPage = observer(({ isAuthenticated }) => {
  const theme = useTheme();
  const { rewardsStore } = useContext(StoreContext);
  const [tabValue, setTabValue] = useState(0);
  const [redeemSuccess, setRedeemSuccess] = useState(null);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleRedeemReward = (rewardId) => {
    const result = rewardsStore.redeemReward(rewardId);
    if (result) {
      setRedeemSuccess(result.name);
      setTimeout(() => setRedeemSuccess(null), 3000);
    }
  };
  
  // Calculate progress to next level
  const pointsToNextLevel = (rewardsStore.userLevel * 500) - rewardsStore.totalPoints;
  const progressToNextLevel = ((500 - pointsToNextLevel) / 500) * 100;
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Rewards & Achievements
        </Typography>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            border: `1px solid ${theme.palette.brand.lightGray}`,
            borderRadius: 2,
            mb: 4,
            bgcolor: theme.palette.brand.lightTeal
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                Level {rewardsStore.userLevel}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h4" component="div" sx={{ mr: 2 }}>
                  {rewardsStore.totalPoints}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  points
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progressToNextLevel} 
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    bgcolor: 'rgba(255, 255, 255, 0.5)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: theme.palette.primary.main
                    }
                  }}
                />
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {pointsToNextLevel} points to Level {rewardsStore.userLevel + 1}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Ways to earn points:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Typography variant="body2" gutterBottom>
                      Share a product
                    </Typography>
                    <Typography variant="h6" color="primary">
                      +25 points
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Typography variant="body2" gutterBottom>
                      Get 10 likes
                    </Typography>
                    <Typography variant="h6" color="primary">
                      +50 points
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Typography variant="body2" gutterBottom>
                      Daily login
                    </Typography>
                    <Typography variant="h6" color="primary">
                      +10 points
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Typography variant="body2" gutterBottom>
                      Create a list
                    </Typography>
                    <Typography variant="h6" color="primary">
                      +20 points
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        
        {redeemSuccess && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 3, 
              bgcolor: theme.palette.success.light,
              color: theme.palette.success.contrastText,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="body1">
              Successfully redeemed: {redeemSuccess}! Check your email for details.
            </Typography>
          </Paper>
        )}
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<EmojiEventsIcon />} label="Badges" />
            <Tab icon={<CardGiftcardIcon />} label="Rewards" />
            <Tab icon={<HistoryIcon />} label="Points History" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Your Badges
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {rewardsStore.earnedBadges.map(badge => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={badge.id}>
                <BadgeCard badge={badge} />
              </Grid>
            ))}
          </Grid>
          
          <Typography variant="h6" gutterBottom>
            Badges to Earn
          </Typography>
          <Grid container spacing={3}>
            {rewardsStore.unearnedBadges.map(badge => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={badge.id}>
                <BadgeCard badge={badge} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Available Rewards
          </Typography>
          <Grid container spacing={3}>
            {rewardsStore.availableRewards.map(reward => (
              <Grid item xs={12} sm={6} md={4} key={reward.id}>
                <RewardCard 
                  reward={reward} 
                  onRedeem={handleRedeemReward}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Points History
          </Typography>
          <Paper 
            elevation={0} 
            sx={{ 
              border: `1px solid ${theme.palette.brand.lightGray}`,
              borderRadius: 2
            }}
          >
            <List>
              {rewardsStore.pointsHistory.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <ListItemIcon>
                      {item.amount > 0 ? (
                        <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                          <ArrowUpwardIcon />
                        </Avatar>
                      ) : (
                        <Avatar sx={{ bgcolor: theme.palette.error.light }}>
                          <ArrowDownwardIcon />
                        </Avatar>
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.reason} 
                      secondary={item.date}
                    />
                    <Typography 
                      variant="body1" 
                      color={item.amount > 0 ? "success.main" : "error.main"}
                      sx={{ fontWeight: 'bold' }}
                    >
                      {item.amount > 0 ? `+${item.amount}` : item.amount}
                    </Typography>
                  </ListItem>
                  {index < rewardsStore.pointsHistory.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </TabPanel>
      </Container>
    </>
  );
});

export default RewardsPage; 