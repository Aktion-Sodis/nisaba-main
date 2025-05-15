import apps from './apps.json';
import languageinfo from './languageinfo.json';
import pages from './pages';
import utils from './utils.json';
export default {
  apps,
  languageinfo,
  utils,
  // pages
  ...pages,
};
