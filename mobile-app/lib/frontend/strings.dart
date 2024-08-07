import 'dart:io';

import 'package:mobile_app/backend/repositories/LocalDataRepository.dart';
import 'package:path/path.dart';
import 'package:string_similarity/string_similarity.dart';

///hier die String jeweils in englisch hinterlegen und in allen anderen  angelegten Sprachen zumindest anlegen
///bei neuen strings am ende übersetzung anfordern
///

//todo: in klasse machen

Map<String, String> availableLocals = const {
  "en-US": "English (US)",
  "es-BO": "Español (Bolivia)"
};

String get currentLanguage {
  String? savedLocale;
  try {
    savedLocale = LocalDataRepository.instance.locale;
  } catch (e) {}

  if (savedLocale != null) {
    return savedLocale;
  } else {
    List<String> toSort = stringMap.keys.toList();
    toSort.sort((a, b) {
      double aEqualness =
          StringSimilarity.compareTwoStrings(a, Platform.localeName);
      double bEqualness =
          StringSimilarity.compareTwoStrings(b, Platform.localeName);
      if (aEqualness == bEqualness) {
        return 0;
      } else if (aEqualness > bEqualness) {
        return -1;
      } else {
        return 1;
      }
    });
    //todo: set locale in db
    return toSort.first;
  }
}

Map<String, dynamic> stringMap = {
  "en-US": {
    "emailorphonenumber": "E-Mail/Phone number",
    "email": "E-Mail",
    "phonenumber": "Phone number",
    "password": "Password",
    "malformedemailmessage": "Please provide a valid e-mail address",
    "malformedphonenumber":
        "Please provide a phone number according to the format +123456879",
    "noaccountmessage":
        "Unfortunatley, no account exists for the provided information. If it is correct, please contact your account manager.",
    "enterpassword": "Enter password",
    "login": "Login",
    "or": "Or",
    "google_sign_in": "Sign in with Google",
    "invalid_password":
        "Please enter a valid password (minimum 6 patterns; at least one upper and lower case pattern; at least one number)",
    "not_same_password": "The provided passwords do not match.",
    "save_password": "Save",
    "change_password_text":
        "For security reasons, please set your own password!",
    "new_password": "New password",
    "new_password_validation": "New password (validation)",
    "test_list": "Tests",
    "user_forename": "Forename",
    "user_surname": "Surname",
    "user_please_enter_forename": "Please enter your forename",
    "user_please_enter_surename": "Please enter your surename",
    "user_create_save": "Okay",
    "user_create_info":
        "Please enter your prename and surname to finish account creation. If you want, you can take a profile pic!",
    "logout": "Log out",
    "main_menu_home": "Home",
    "main_menu_organization": "Organization",
    "main_menu_tasks": "Tasks",
    "main_menu_wiki": "Wiki",
    "question_type_descriptions": {
      "sc": "One answer only",
      "mc": "Multiple answers possible",
      "text_field": "Write down your answer",
      "int": "Write down a whole number",
      "double": "Write down a decimal number",
      "rating": "Rate by dragging",
    },
    "summary": "summary",
    "end_survey": "Are you sure you want to end the survey?",
    "saved_survey": "Thank you for answering the survey",
    "organization_view_taks": "Tasks",
    "organization_view_surveys": "Surveys",
    "organization_view_applied_interventions": "Interventions",
    "organization_view_info": "Information",
    "organization_view_history": "History",
    "organization_view_dialog_add_entity": "Add Entity",
    "organization_view_dialog_edit_entity": "Edit Entity",
    "organization_view_entity_name": "Name",
    "organization_view_entity_description": "Description",
    "organization_view_entity_save_entity": "Save Entity",
    "organization_view_entity_save_changes": "Save Changes",
    "organization_view_info_button": "Info",
    "organization_view_entity_enter_name": "Please enter a name",
    "organization_view_entity_enter_description": "Please enter a description",
    "organization_view_dialog_add_appliedintervention": "Add Intervention",
    "organization_view_dialog_update_appliedintervention":
        "Update Intervention",
    "organization_view_appliedintervention_detail_techonology_working":
        "Is the technology working?",
    "yes": "Yes",
    "no": "No",
    "remaining": "Remaining",
    "day": "day",
    "days": "days",
    "tasks_more_behind": "More behind",
    "profile": "Profile",
    "user_update": "Save changes",
    "abort_survey": "Abort survey?",
    "abort_survey_warn":
        "You wont be able to proceed later and will have to start again",
    "confirm_abort": "Abort",
    "do_not_abort": "Continue",
    "your shot": "Your shot:",
    "accepted": "Accepted",
    "restricted": "Restricted",
    "required": "Required",
    "accept_permissions": "Accept permissions",
    "accept_all_permissions": "Accept all permissions",
    "open_settings": "Open settings",
    "abbrechen": "Abbrechen",
    "restricted_permissions_warning":
        "Some of the permissions can be accepted only in the settings. Please, open the settings and accept all the permissions.",
    "task_dialog_what_task": "What need's to be done?",
    "task_dialog_title": "Short summary",
    "task_dialog_description": "Further description",
    "task_dialog_record_audio": "Record audio",
    "task_dialog_take_foto": "Take a foto",
    "task_dialog_entity_choose": "For whom is the task?",
    "task_dialog_entity_search": "Enter a name",
    "task_dialog_entity_search_no_result": "No results found",
    "task_dialog_entity_search_hint": "Select entity",
    "task_dialog_when": "When will you do it?",
    "task_today": "Today",
    "task_tomorrow": "Tomorrow",
    "task_next_week": "Next week",
    "task_next_month": "Next month",
    "task_or": "Or",
    "task_deadline": "Due",
    "task_set_date": "Set a date",
    "task_save_task": "Save Task",
    "task_update_task": "Update Task",
    "task_create_title": "Create Task",
    "task_update_title": "Update Task",
    "task_later_in_future": "Later",
    "task_please_enter_task_title": "Please enter a title",
    "task_please_set_date": "Please set the deadline",
    "use_wifi_only": "Use only WiFi for uploading images and audio",
    "internet_usage": "Usage of internet",
    "restrict_mobile_data_question":
        "Usage of mobile data can be more expensive than usage of WiFi. Do you want to restrict uploading audio and photos via mobile data?",
    "use_only_wifi_button": "Use only WiFi",
    "use_wifi_and_mobile_data": "Use WiFi and mobile data",
    "sync_in_preparation": "Sync in preparation",
    "sync_surveys": "Surveys",
    "sync_other_elements": "Other elements",
    "sync_files": "Fotos and Audios",
    "sync_failed_saved_surveys": "Problematic but secured surveys",
    "sync_failed_other_elements": "Problematic but secured other elements",
    "sync_interrupted": "Synchronization interrupted",
    "sync_button_start": "Start synchronization",
    "sync_button_in_sync": "Synchronizing..."
  },
  "es-BO": {
    "emailorphonenumber": "correo electrónico/número de teléfono",
    "email": "Correo electrónico",
    "phonenumber": "Número de teléfono",
    "password": "Contraseña",
    "malformedemailmessage":
        "Por favor indique una dirección de correo electrónico valida.",
    "malformedphonenumber":
        "Por favor indique un número de telefóno que corresponde al formato +123456879",
    "noaccountmessage":
        "Desafortunadamente no existe una cuenta correspondiente. Si la información ingresada fue correcta, contacte su administrador/a de cuentas.",
    "enterpassword": "Ingrese contraseña",
    "login": "Iniciar sesión",
    "or": "O",
    "google_sign_in": "Autentifcar con Google",
    "invalid_password":
        "Por favor ingrese la contraseña válida (al menos 6 caracteres; al menos un caracter minúscolo y mayúsculo; al menos un número).",
    "not_same_password": "Las contraseñas ingresadas no son iguales.",
    "save_password": "Guardar",
    "change_password_text":
        "¡Por motivos de seguridad, por favor ingrese su contraseña personal!",
    "new_password": "Nueva contraseña",
    "new_password_validation": "Nueva contraseña (validación)",
    "test_list": "Ensayos",
    "user_forename": "Nombre",
    "user_surname": "Surname",
    "user_please_enter_forename": "Por favor ingrese su nombre",
    "user_please_enter_surename": "Por favor ingrese su apellido",
    "user_create_save": "De acuerdo",
    "user_create_info":
        "Por favor ingrese su nombre e apellido para finalizar la creación de su cuenta. ¡Si quiere, puede tomar su foto de perfil!",
    "logout": "Cerrar la sesión",
    "main_menu_home": "Inicio",
    "main_menu_organization": "Organización",
    "main_menu_tasks": "Tarreas",
    "main_menu_wiki": "Conocimientos",
    "question_type_descriptions": {
      "sc": "Solamente una respuesta",
      "mc": "Multiples respuestas posibles",
      "text_field": "Escriba su respuesta",
      "int": "Escribe un número entero",
      "double": "Escribe un número decimal",
      "rating": "Tarifa por arrastre",
    },
    "summary": "Resumen",
    "end_survey": "¿Seguro que quiere terminar la entrevista?",
    "saved_survey": "Gracias por realizar la entrevista",
    "organization_view_taks": "Tarrea",
    "organization_view_surveys": "Entrevistas",
    "organization_view_applied_interventions": "Intervenciones",
    "organization_view_info": "Información",
    "organization_view_history": "Historía",
    "organization_view_dialog_add_entity": "Agregar entidad",
    "organization_view_dialog_edit_entity": "Editar entidad",
    "organization_view_entity_name": "Nombre",
    "organization_view_entity_description": "Descripción",
    "organization_view_entity_save_entity": "Guardar entidad",
    "organization_view_entity_save_changes": "Guardar cambios",
    "organization_view_info_button": "Información",
    "organization_view_entity_enter_name": "Por favor ingrese un nombre",
    "organization_view_entity_enter_description":
        "Por favor ingrese una descripción",
    "organization_view_dialog_add_appliedintervention": "Agregar intervención",
    "organization_view_dialog_update_appliedintervention":
        "Actualizar intervención",
    "organization_view_appliedintervention_detail_techonology_working":
        "¿La tecnologia aún funciona?",
    "yes": "Sí",
    "no": "No",
    "remaining": "Quedan",
    "day": "día",
    "days": "días",
    "tasks_more_behind":
        "más atrás", // unable to find context in source code, translation may be incorrect
    "profile": "Perfil",
    "user_update": "Guardar cambios",
    "abort_survey": "¿Abortar entrevista?",
    "abort_survey_warn":
        "No va poder resumir más tarde. Tiene que reiniciar la entrevista.",
    "confirm_abort": "Abortar",
    "do_not_abort": "Continuar",
    "your shot": "Te toca:",
    "accepted": "Aceptando",
    "abbrechen": "Quitar",
    "restricted": "Restrictando",
    "required": "Obligatorio",
    "accept_permissions": "Acepto",
    "accept_all_permissions": "Acepto todó",
    "open_settings": "open_settings",
    "restricted_permission_warning": "Aceso restricado",
    "task_dialog_what_task": "Qué se tiene que hacer?",
    "task_dialog_title": "Resumen corto",
    "task_dialog_description": "Más descripción",
    "task_dialog_record_audio": "Recordar audio",
    "task_dialog_take_foto": "Tomar un foto",
    "task_dialog_entity_choose": "¿Para quién es la tarrea?",
    "task_dialog_entity_search": "Ingresar un nombre",
    "task_dialog_entity_search_no_result": "No se ha encontrado resultados",
    "task_dialog_entity_search_hint": "Seleccionar entidad",
    "task_dialog_when": "¿Cuándo lo va a hacer?",
    "task_today": "Hoy",
    "task_tomorrow": "Mañana",
    "task_next_week": "Próxima semana",
    "task_next_month": "Próximo mes",
    "task_or": "O",
    "task_deadline": "se debe hasta",
    "task_set_date": "Ingresar una fecha",
    "task_save_task": "Guardar tarrea",
    "task_update_task": "Actualizar tarrea",
    "task_create_title": "Crear tarrea",
    "task_update_title": "Actualizar tarrea",
    "task_later_in_future": "Más tarde",
    "task_please_enter_task_title": "Por favor, introduce un título",
    "task_please_set_date": "Por favor, defina la fecha",
    "use_wifi_only": "Utiliza sólo WiFi para subir imágenes y audio",
    "internet_usage": "Uso de Internet",
    "restrict_mobile_data_question":
        "El uso de datos móviles puede ser más caro que el uso de WiFi. Quieres restringir la carga de audio y fotos a través de los datos móviles?",
    "use_only_wifi_button": "Usar sólo WiFi",
    "use_wifi_and_mobile_data": "Utilizar el WiFi y los datos móviles",
    "sync_in_preparation": "Sincronización en preparación",
    "sync_surveys": "Entrevistas",
    "sync_other_elements": "Otros elementos",
    "sync_files": "Fotos y Audios",
    "sync_failed_saved_surveys": "Entrevistas problemáticas pero seguras",
    "sync_failed_other_elements": "Otros elementos problemáticos pero seguros",
    "sync_interrupted": "Sincronización interrumpida",
    "sync_button_start": "Iniciar sincronización",
    "sync_button_in_sync": "Sincronizando..."
  }
};

String get task_please_enter_task_title =>
    stringMap[currentLanguage]["task_please_enter_task_title"];

String get task_please_set_date =>
    stringMap[currentLanguage]["task_please_set_date"];

String get task_later_in_future =>
    stringMap[currentLanguage]["task_later_in_future"];
String get task_dialog_what_task =>
    stringMap[currentLanguage]["task_dialog_what_task"];
String get task_dialog_title => stringMap[currentLanguage]["task_dialog_title"];
String get task_dialog_description =>
    stringMap[currentLanguage]["task_dialog_description"];
String get task_dialog_record_audio =>
    stringMap[currentLanguage]["task_dialog_record_audio"];
String get task_dialog_take_foto =>
    stringMap[currentLanguage]["task_dialog_take_foto"];
String get task_dialog_entity_choose =>
    stringMap[currentLanguage]["task_dialog_entity_choose"];
String get task_dialog_entity_search =>
    stringMap[currentLanguage]["task_dialog_entity_search"];
String get task_dialog_entity_search_no_result =>
    stringMap[currentLanguage]["task_dialog_entity_search_no_result"];
String get task_dialog_entity_search_hint =>
    stringMap[currentLanguage]["task_dialog_entity_search_hint"];
String get task_dialog_when => stringMap[currentLanguage]["task_dialog_when"];
String get task_today => stringMap[currentLanguage]["task_today"];
String get task_tomorrow => stringMap[currentLanguage]["task_tomorrow"];
String get task_next_week => stringMap[currentLanguage]["task_next_week"];
String get task_next_month => stringMap[currentLanguage]["task_next_month"];
String get task_or => stringMap[currentLanguage]["task_or"];
String get task_deadline => stringMap[currentLanguage]["task_deadline"];
String get task_set_date => stringMap[currentLanguage]["task_set_date"];
String get task_save_task => stringMap[currentLanguage]["task_save_task"];
String get task_update_task => stringMap[currentLanguage]["task_update_task"];
String get task_create_title => stringMap[currentLanguage]["task_create_title"];
String get task_update_title => stringMap[currentLanguage]["task_update_title"];

String get accepted => stringMap[currentLanguage]["accepted"];

String get abbrechen => stringMap[currentLanguage]["abbrechen"];

String get restricted => stringMap[currentLanguage]["restricted"];

String get required => stringMap[currentLanguage]["required"];

String get accept_permissions =>
    stringMap[currentLanguage]["accept_permissions"];

String get accept_all_permissions =>
    stringMap[currentLanguage]["accept_all_permissions"];

String get open_settings => stringMap[currentLanguage]["open_settings"];

String get restricted_permissions_warning =>
    stringMap[currentLanguage]["restricted_permissions_warning"];

String get user_update => stringMap[currentLanguage]["user_update"];

String get profile => stringMap[currentLanguage]["profile"];

String get tasks_more_behind => stringMap[currentLanguage]["tasks_more_behind"];

String get remaining => stringMap[currentLanguage]["remaining"];

String get day => stringMap[currentLanguage]["day"];

String get days => stringMap[currentLanguage]["days"];

String get organization_view_appliedintervention_detail_techonology_working =>
    stringMap[currentLanguage]
        ["organization_view_appliedintervention_detail_techonology_working"];

String get yes => stringMap[currentLanguage]["yes"];

String get no => stringMap[currentLanguage]["no"];

String get organization_view_dialog_add_appliedintervention =>
    stringMap[currentLanguage]
        ["organization_view_dialog_add_appliedintervention"];

String get organization_view_dialog_update_appliedintervention =>
    stringMap[currentLanguage]
        ["organization_view_dialog_update_appliedintervention"];

String get organization_view_entity_enter_name =>
    stringMap[currentLanguage]["organization_view_entity_enter_name"];

String get organization_view_entity_enter_description =>
    stringMap[currentLanguage]["organization_view_entity_enter_description"];

String get organization_view_info_button =>
    stringMap[currentLanguage]["organization_view_info_button"];

String get organization_view_history =>
    stringMap[currentLanguage]["organization_view_history"];

String get organization_view_taks =>
    stringMap[currentLanguage]["organization_view_taks"];

String get organization_view_surveys =>
    stringMap[currentLanguage]["organization_view_surveys"];

String get organization_view_applied_interventions =>
    stringMap[currentLanguage]["organization_view_applied_interventions"];

String get organization_view_info =>
    stringMap[currentLanguage]["organization_view_info"];

String get organization_view_dialog_add_entity =>
    stringMap[currentLanguage]["organization_view_dialog_add_entity"];

String get organization_view_dialog_edit_entity =>
    stringMap[currentLanguage]["organization_view_dialog_edit_entity"];

String get organization_view_entity_name =>
    stringMap[currentLanguage]["organization_view_entity_name"];

String get organization_view_entity_description =>
    stringMap[currentLanguage]["organization_view_entity_description"];

String get organization_view_entity_save_entity =>
    stringMap[currentLanguage]["organization_view_entity_save_entity"];

String get organization_view_entity_save_changes =>
    stringMap[currentLanguage]["organization_view_entity_save_changes"];

String get main_menu_home => stringMap[currentLanguage]["main_menu_home"];

String get main_menu_organization =>
    stringMap[currentLanguage]["main_menu_organization"];

String get main_menu_tasks => stringMap[currentLanguage]["main_menu_tasks"];

String get main_menu_wiki => stringMap[currentLanguage]["main_menu_wiki"];

String get user_forename => stringMap[currentLanguage]["user_forename"];

String get user_surname => stringMap[currentLanguage]["user_surname"];

String get user_please_enter_forename =>
    stringMap[currentLanguage]["user_please_enter_forename"];

String get user_please_enter_surename =>
    stringMap[currentLanguage]["user_please_enter_surename"];

String get user_create_save => stringMap[currentLanguage]["user_create_save"];

String get user_create_info => stringMap[currentLanguage]["user_create_info"];

String get logout => stringMap[currentLanguage]["logout"];

String get new_password => stringMap[currentLanguage]["new_password"];

String get new_password_validation =>
    stringMap[currentLanguage]["new_password_validation"];

String get emailorphonenumber =>
    stringMap[currentLanguage]["emailorphonenumber"];

String get invalid_password => stringMap[currentLanguage]["invalid_password"];

String get not_same_password => stringMap[currentLanguage]["not_same_password"];

String get save_password => stringMap[currentLanguage]["save_password"];

String get change_password_text =>
    stringMap[currentLanguage]["change_password_text"];

String get phonenumber => stringMap[currentLanguage]["phonenumber"];

String get email => stringMap[currentLanguage]["email"];

String get password => stringMap[currentLanguage]["password"];

String get malformedemailmessage =>
    stringMap[currentLanguage]["malformedemailmessage"];

String get malformedphonenumber =>
    stringMap[currentLanguage]["malformedphonenumber"];

String get noaccountmessage => stringMap[currentLanguage]["noaccountmessage"];

String get enterpassword => stringMap[currentLanguage]["enterpassword"];

String get login => stringMap[currentLanguage]["login"];

String get or => stringMap[currentLanguage]["or"];

String get google_sign_in => stringMap[currentLanguage]["google_sign_in"];

String get test_list => stringMap[currentLanguage]["test_list"];

String get singleChoiceTypeDescription =>
    stringMap[currentLanguage]["question_type_descriptions"]["sc"];
String get multipleChoiceTypeDescription =>
    stringMap[currentLanguage]["question_type_descriptions"]["mc"];
String get textFieldTypeDescription =>
    stringMap[currentLanguage]["question_type_descriptions"]["text_field"];
String get integerTypeDescription =>
    stringMap[currentLanguage]["question_type_descriptions"]["int"];
String get doubleTypeDescription =>
    stringMap[currentLanguage]["question_type_descriptions"]["double"];
String get ratingTypeDescription =>
    stringMap[currentLanguage]["question_type_descriptions"]["rating"];
String get summary => stringMap[currentLanguage]["summary"];
String get endSurvey => stringMap[currentLanguage]["end_survey"];
String get savedSurvey => stringMap[currentLanguage]["saved_survey"];

String get abortSurvey => stringMap[currentLanguage]["abort_survey"];
String get abortSurveyText => stringMap[currentLanguage]["abort_survey_warn"];
String get confirmAbort => stringMap[currentLanguage]["confirm_abort"];
String get doNotAbort => stringMap[currentLanguage]["do_not_abort"];

String get yourShot => stringMap[currentLanguage]["your shot"];

String get useWifiOnly => stringMap[currentLanguage]["use_wifi_only"];

String get internetUsage => stringMap[currentLanguage]["internet_usage"];
String get restrictMobileDataQuestion =>
    stringMap[currentLanguage]["restrict_mobile_data_question"];
String get useOnlyWifiButton =>
    stringMap[currentLanguage]["use_only_wifi_button"];
String get useWifiAndMobileData =>
    stringMap[currentLanguage]["use_wifi_and_mobile_data"];

String get syncInPreparation =>
    stringMap[currentLanguage]["sync_in_preparation"];

String get syncSurveys => stringMap[currentLanguage]["sync_surveys"];

String get syncOtherElements =>
    stringMap[currentLanguage]["sync_other_elements"];

String get syncFiles => stringMap[currentLanguage]["sync_files"];

String get syncFailedSavedSurveys =>
    stringMap[currentLanguage]["sync_failed_saved_surveys"];

String get syncFailedOtherElements =>
    stringMap[currentLanguage]["sync_failed_other_elements"];

String get syncInterrupted => stringMap[currentLanguage]["sync_interrupted"];

String get syncButtonStart => stringMap[currentLanguage]["sync_button_start"];

String get syncButtonInSync => stringMap[currentLanguage]["sync_button_in_sync"];
