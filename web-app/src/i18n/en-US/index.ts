import apps from './apps.json';
import configurator from './configurator.json';
import form from './form.json';
import languageinfo from './languageinfo.json';
import pages from './pages';
import utils from './utils.json';
export default {
  apps,
  configurator,
  form,
  languageinfo,
  utils,
  // pages
  ...pages,
};
