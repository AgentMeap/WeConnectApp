import {
  HomeOutlined,
  Hub,
  Message,
  People,
  Settings,
  Translate,
} from '@mui/icons-material';
import {
  Drawer,
  List,
  ListSubheader,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { toggleDrawer } from '@redux/slices/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ListStyled = styled(List)`
  padding: 16px;
  border-radius: 4px;
  gap: 4px;
`;

const SideBarContent = () => {
  return (
    <div className="flex w-64 flex-col gap-4">
      <ListStyled className="flex flex-col bg-white px-4 py-3 shadow">
        <Link to="/" className="flex items-center gap-1">
          <HomeOutlined fontSize="small" />
          New Feeds
        </Link>
        <Link to="/messages" className="flex items-center gap-1">
          <Message fontSize="small" />
          Messenger
        </Link>
        <Link to="/friends" className="flex items-center gap-1">
          <People fontSize="small" />
          Friends
        </Link>
        <Link to="/groups" className="flex items-center gap-1">
          <Hub fontSize="small" />
          Groups
        </Link>
      </ListStyled>

      <ListStyled className="flex flex-col bg-white px-4 py-3 shadow">
        <ListSubheader className="!px-0 !leading-none">Settings</ListSubheader>
        <Link to="/settings/account" className="flex items-center gap-1">
          <Settings fontSize="small" />
          Account
        </Link>
        <Link to="/settings/languages" className="flex items-center gap-1">
          <Translate fontSize="small" />
          Languages
        </Link>
      </ListStyled>
    </div>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isShowDrawer = useSelector((store) => store.settings.isShowDrawer);
  const dispatch = useDispatch();
  console.log({ isMobile });
  return isMobile ? (
    <Drawer
      open={isShowDrawer}
      onClose={() => dispatch(toggleDrawer())}
      classes={{ paper: 'p-4 flex flex-col gap-4 !bg-dark-200' }}
    >
      <div>
        <Link to="/">
          <img src="/weconnect-logo.png" className="h-8 w-8" />
        </Link>
      </div>
      <SideBarContent />
    </Drawer>
  ) : (
    <SideBarContent />
  );
};
export default Sidebar;
