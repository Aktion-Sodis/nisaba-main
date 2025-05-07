import apps from './apps.json';
import languageinfo from './languageinfo.json';
import navigation from './navigation.json';
import pages from './pages';
import utils from './utils.json';
export default {
  apps,
  navigation,
  languageinfo,
  utils,
  // pages
  ...pages,
};
