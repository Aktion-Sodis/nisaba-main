import apps from './apps.json';
import languageinfo from './languageinfo.json';
import navigation from './navigation.json';
import pages from './pages';

export default {
  apps,
  navigation,
  languageinfo,
  ...pages,
};
