import 'dart:io';

import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:image_picker/image_picker.dart';
import 'package:lazy_load_scrollview/lazy_load_scrollview.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:mobile_app/backend/Blocs/in_app/in_app_bloc.dart';
import 'package:mobile_app/backend/Blocs/in_app/in_app_events.dart';
import 'package:mobile_app/backend/Blocs/organization_view/organization_view_bloc.dart';
import 'package:mobile_app/backend/Blocs/organization_view/organization_view_events.dart';
import 'package:mobile_app/backend/Blocs/organization_view/organization_view_state.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_bloc.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_state.dart';
import 'package:mobile_app/backend/Blocs/task/task_bloc.dart';
import 'package:mobile_app/backend/Blocs/task/task_state.dart';
import 'package:mobile_app/backend/Blocs/user/user_bloc.dart';
import 'package:mobile_app/backend/callableModels/CallableModels.dart';
import 'package:mobile_app/backend/repositories/AppliedInterventionRepository.dart';
import 'package:mobile_app/backend/repositories/EntityRepository.dart';
import 'package:mobile_app/backend/repositories/ExecutedSurveyRepository.dart';
import 'package:mobile_app/backend/repositories/InterventionRepository.dart';
import 'package:mobile_app/backend/repositories/SurveyRepository.dart';
import 'package:mobile_app/backend/storage/image_synch.dart';
import 'package:mobile_app/frontend/components/buttons.dart';
import 'package:mobile_app/frontend/components/imageWidget.dart';
import 'package:mobile_app/frontend/components/loadingsign.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';
import 'package:mobile_app/frontend/pages/main_menu.dart';
import 'package:mobile_app/frontend/pages/main_menu_components/main_menu_commonwidgets.dart';
import 'package:mobile_app/frontend/pages/main_menu_components/main_menu_tasks.dart';
import 'package:mobile_app/frontend/strings.dart' as strings;
import 'package:mobile_app/frontend/common_widgets.dart';
import 'package:mobile_app/utils/photo_capturing.dart';
import 'package:mobile_app/frontend/pages/survey.dart' as surveyarea;

import '../../../backend/callableModels/Relation.dart';

// TODO: refactor this file as the code is not readable
class MainMenuOrganization extends StatelessWidget {
  Widget appBarWidget(BuildContext context,
      EntitiesLoadedOrganizationViewState organizationViewState) {
    return Container(
        height: height(context) * .11,
        width: width(context),
        child: Column(children: [
          Expanded(
              child:
                  Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
            if (organizationViewState.organizationViewType !=
                    OrganizationViewType.LIST ||
                organizationViewState.currentLevelContent.level.parentLevelID !=
                    null)
              Container(
                  alignment: Alignment.center,
                  margin:
                      EdgeInsets.symmetric(vertical: defaultPadding(context)),
                  child: CommonWidgets.defaultBackwardButton(
                      padding: EdgeInsets.symmetric(
                          horizontal: defaultPadding(context)),
                      context: context,
                      goBack: () => context
                          .read<OrganizationViewBloc>()
                          .add(BackTapEvent()))),
            Expanded(
              child: Container(
                  margin: EdgeInsets.only(
                      left: (organizationViewState.organizationViewType ==
                                  OrganizationViewType.LIST &&
                              organizationViewState
                                      .levelContentList.last.level.id ==
                                  organizationViewState.allLevels.first.id)
                          ? defaultPadding(context)
                          : 0),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Expanded(
                          child: Container(
                              padding: EdgeInsets.symmetric(
                                  vertical: defaultPadding(context)),
                              child: Text(
                                organizationViewState.appBarString,
                                style: Theme.of(context).textTheme.headline2,
                                overflow: TextOverflow.ellipsis,
                              ))),
                      if (!show_all_menu_pages)
                        Container(
                            margin: EdgeInsets.symmetric(
                                horizontal: defaultPadding(context)),
                            child: BlocBuilder<SyncBloc, SyncState>(
                                builder: (context, state) {
                              if (state is FullySyncedState) {
                                return Icon(MdiIcons.cloudCheckOutline,
                                    color: Colors.green,
                                    size: width(context) * .08);
                              } else if (state is CannotSyncState) {
                                return Icon(MdiIcons.cloudOffOutline,
                                    color: Colors.red,
                                    size: width(context) * .08);
                              } else {
                                return Icon(MdiIcons.cloudSyncOutline,
                                    color: Theme.of(context)
                                        .colorScheme
                                        .onBackground,
                                    size: width(context) * .08);
                              }
                            })),
                      //if no menu shown, add user management for highest element and if no other main menu pages shown
                      if (true &&
                          (organizationViewState.organizationViewType ==
                                  OrganizationViewType.LIST &&
                              !show_all_menu_pages) &&
                          organizationViewState
                                  .currentLevelContent.level.parentLevelID ==
                              null)
                        CustomIconButton(() {
                          context.read<InAppBloc>().add(GoToUserPageEvent());
                        },
                            MdiIcons.human,
                            Size(width(context) * .1, width(context) * .1),
                            true),
                      if (organizationViewState.organizationViewType ==
                              OrganizationViewType.LIST &&
                          organizationViewState.addEntityPossible)
                        Container(
                            margin: EdgeInsets.symmetric(
                                vertical: defaultPadding(context)),
                            child: CommonWidgets.defaultIconButton(
                                onPressed: () async {
                                  Entity? toAdd = await showEntityDialog(
                                      context,
                                      null,
                                      organizationViewState
                                          .levelContentList.last.level,
                                      organizationViewState.levelContentList
                                                  .last.parentEntity ==
                                              null
                                          ? null
                                          : organizationViewState
                                              .levelContentList
                                              .last
                                              .parentEntity!
                                              .id);
                                  if (toAdd != null) {
                                    context
                                        .read<OrganizationViewBloc>()
                                        .add(AddEntity(toAdd));
                                  }
                                },
                                context: context,
                                iconData: MdiIcons.plus,
                                buttonSizes: ButtonSizes.small,
                                fillColor:
                                    Theme.of(context).colorScheme.secondary)),
                      if (organizationViewState.organizationViewType ==
                              OrganizationViewType.SURVEYS ||
                          organizationViewState.organizationViewType ==
                              OrganizationViewType.HISTORY)
                        Container(
                            child: CustomIconButton(
                          () {
                            if (organizationViewState.organizationViewType ==
                                OrganizationViewType.SURVEYS) {
                              context.read<OrganizationViewBloc>().add(
                                  NavigateToEntityHistory(organizationViewState
                                      .currentDetailEntity!));
                            } else {
                              context
                                  .read<OrganizationViewBloc>()
                                  .add(BackTapEvent());
                            }
                          },
                          MdiIcons.history,
                          Size(width(context) * .1, width(context) * .1),
                          true,
                          selected:
                              organizationViewState.organizationViewType ==
                                  OrganizationViewType.HISTORY,
                        ))
                    ],
                  )),
            )
          ])),
          Container(width: width(context), height: 1, color: Colors.grey)
        ]));
  }

  Widget mainWidget(BuildContext context,
      EntitiesLoadedOrganizationViewState organizationViewState) {
    Widget actualWidget(BuildContext context) {
      switch (organizationViewState.organizationViewType) {
        case OrganizationViewType.LIST:
          return Container(
              child: ListWidget(
            key: Key(organizationViewState.levelContentList.last.level.id!),
          ));
          break;
        case OrganizationViewType.OVERVIEW:
          print('Entity build process');
          print('on surveys tapped');
          print(organizationViewState.currentDetailEntity!.displayName);
          return Container(
              key: ValueKey(DateTime.now().toIso8601String()),
              child: OverviewWidget(
                  key: ValueKey(DateTime.now().toIso8601String()),
                  entity: organizationViewState.currentDetailEntity!,
                  onTasksTapped: (entity) {
                    context
                        .read<OrganizationViewBloc>()
                        .add(NavigateToEntityTasks(entity));
                  },
                  onSurveysTapped: (entity) {
                    context
                        .read<OrganizationViewBloc>()
                        .add(NavigateToEntitySurveys(entity));
                  },
                  onAppliedInterventionsTapped: (entity) {
                    context
                        .read<OrganizationViewBloc>()
                        .add(NavigateToEntityAppliedInterventions(entity));
                  },
                  onUpdateEntityTapped: (entity) {
                    showEntityDialog(context, entity, entity.level,
                            entity.parentEntityID)
                        .then((value) {
                      if (value != null) {
                        context
                            .read<OrganizationViewBloc>()
                            .add(UpdateEntity(value));
                      } else {
                        context.read<OrganizationViewBloc>().add(UpdatePic());
                      }
                    });
                  }));
        case OrganizationViewType.APPLIEDINTERVENTIONS:
          return Container(
              key:
                  ValueKey(organizationViewState.keyDateTime.toIso8601String()),
              child: AppliedInterventionOverviewPage(
                  key: ValueKey(organizationViewState.currentDetailEntity)));
        case OrganizationViewType.APPLIEDINTERVENTIONDETAIL:
          return Container(
              key:
                  ValueKey(organizationViewState.keyDateTime.toIso8601String()),
              child: AppliedInterventionPage(
                  key: ValueKey(
                      organizationViewState.currentDetailAppliedIntervention)));
        case OrganizationViewType.SURVEYS:
          return Container(
              key:
                  ValueKey(organizationViewState.keyDateTime.toIso8601String()),
              child: SurveyWidget(
                  key: ValueKey(organizationViewState.currentDetailEntity)));
          break;
        case OrganizationViewType.TASKS:
          return Container(
              key:
                  ValueKey(organizationViewState.keyDateTime.toIso8601String()),
              child: TaskWidget(
                  entity: organizationViewState.currentDetailEntity,
                  key: ValueKey(organizationViewState.currentDetailEntity)));
          break;
        case OrganizationViewType.HISTORY:
          return Container(
              key:
                  ValueKey(organizationViewState.keyDateTime.toIso8601String()),
              child: ExecutedSurveyHistory(
                  entity: organizationViewState.currentDetailEntity!));
        case OrganizationViewType.EXECUTEDSURVEY:
          return Container(
              key:
                  ValueKey(organizationViewState.keyDateTime.toIso8601String()),
              child: ExecutedSurveyWidget(
                organizationViewState.executedSurveyToDisplay!,
              ));

        default:
          return Container();
          break;
      }
    }

    return AnimatedSwitcher(
        duration: Duration(milliseconds: 200), child: actualWidget(context));
  }

  Widget levelIndicatorWidget(BuildContext context,
      EntitiesLoadedOrganizationViewState organizationViewState) {
    return Container();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<OrganizationViewBloc, OrganizationViewState>(
        builder: (context, state) {
      if (state is LoadingOrganizationViewState) {
        return Center(child: loadingSign(context));
      } else {
        return Column(
          mainAxisSize: MainAxisSize.max,
          children: [
            appBarWidget(context, state as EntitiesLoadedOrganizationViewState),
            levelIndicatorWidget(
                context, state as EntitiesLoadedOrganizationViewState),
            Expanded(child: mainWidget(context, state))
          ],
        );
      }
    });
  }
}

Future<Entity?> showEntityDialog(BuildContext buildContext, Entity? entity,
    Level level, String? parentEntityID) async {
  return showDialog(
      barrierColor: Theme.of(buildContext).colorScheme.background,
      context: buildContext,
      builder: (context) {
        return EntityDialogWidget(entity, level, parentEntityID, buildContext);
      });
}

class EntityDialogWidget extends StatefulWidget {
  Entity? entity;
  Level level;
  String? parentEntityID;
  BuildContext buildContext;
  EntityDialogWidget(
      this.entity, this.level, this.parentEntityID, this.buildContext);

  @override
  State<StatefulWidget> createState() {
    return EntityDialogWidgetState();
  }
}

class EntityDialogWidgetState extends State<EntityDialogWidget> {
  final _formKey = GlobalKey<FormState>();

  bool create = true;
  Entity? entity;
  String? _preliminaryEntityId;

  String? get preliminaryEntityId => entity?.id ?? _preliminaryEntityId;
  set preliminaryEntityId(String? entityId) => _preliminaryEntityId = entityId;

  late TextEditingController nameEditingController;
  late TextEditingController descriptionEditingController;
  late List<TextEditingController> customDataControllers;

  Widget customDataField(int index) {
    return Container(
        margin: EdgeInsets.only(
            top: defaultPadding(context),
            left: defaultPadding(context),
            right: defaultPadding(context)),
        child: TextFormField(
          enabled: create,
          controller: customDataControllers[index],
          decoration: InputDecoration(
              prefixIcon: const Icon(MdiIcons.pen),
              labelText: widget.level.customData[index].displayName),
          textInputAction: TextInputAction.next,
          keyboardType:
              widget.level.customData[index].type == CustomDataType.INT
                  ? TextInputType.number
                  : null,
          enableSuggestions: true,
          validator: (value) => null,
        ));
  }

  @override
  void initState() {
    nameEditingController = TextEditingController();
    descriptionEditingController = TextEditingController();
    customDataControllers = [];
    widget.level.customData.forEach((element) {
      customDataControllers.add(TextEditingController());
    });
    if (widget.entity != null) {
      create = false;
      entity = widget.entity;
      nameEditingController.text = entity!.displayName;
      descriptionEditingController.text = entity!.displayDescription;
      entity!.customData.forEach((cd) {
        int index = widget.level.customData
            .indexWhere((element) => element.id == cd.customDataID);
        customDataControllers[index].text = cd.type == CustomDataType.INT
            ? (cd.intValue.toString())
            : (cd.stringValue ?? "");
      });
    } else {
      preliminaryEntityId = UUID.getUUID();
    }
    syncedFile =
        EntityRepository.instance.getEntityPicByID(preliminaryEntityId!);
    super.initState();
  }

  void save() async {
    if (create) {
      if (_formKey.currentState!.validate()) {
      List<AppliedCustomData> appliedCustomDatas =
          List.generate(widget.level.customData.length, (index) {
        CustomData customData = widget.level.customData[index];
        print("input: ${customDataControllers[index].text.trim()}");
        return AppliedCustomData(
          customDataID: customData.id!,
          type: customData.type,
          name: customData.name,
          intValue: customData.type == CustomDataType.INT
              ? int.tryParse(customDataControllers[index].text.trim()) ?? 0
              : null,
          stringValue: customData.type == CustomDataType.STRING
              ? customDataControllers[index].text.trim()
              : null,
        );
      });
      print("saving entity: customData");
      appliedCustomDatas.forEach((element) {
        print(element.displayName +
            " " +
            element.intValue.toString() +
            " " +
            (element.stringValue ?? "e"));
      });
      if (create) {
        Entity toSave = Entity(
            id: preliminaryEntityId,
            name: I18nString.fromString(string: nameEditingController.text),
            description: I18nString.fromString(
                string: descriptionEditingController.text),
            level: widget.level,
            customData: appliedCustomDatas,
            appliedInterventions: [],
            parentEntityID: widget.parentEntityID);
        Navigator.of(context).pop(toSave);
      } else {
        I18nString nameToSet = widget.entity!.name;
        nameToSet.text = nameEditingController.text;
        I18nString description = widget.entity!.description;
        description.text = descriptionEditingController.text;
        Entity toSave = widget.entity!;
        toSave.name = nameToSet;
        toSave.description = description;
        toSave.customData = appliedCustomDatas;

        Navigator.of(context).pop(toSave);
      }
    }
    } else {
      Navigator.of(context).pop();
    }
    
  }

  late SyncedFile syncedFile;

  void updatePic() async {
    XFile r = await CameraFunctionality.takePicture(context: context);

    print("updating entity image: ${syncedFile.key.toString()}");
    await syncedFile.updateAsPic(r);
    setStateIfMounted(() {});
  }

  void setStateIfMounted(Function function) {
    if (mounted) {
      setState(() {
        function();
      });
    } else {
      function();
    }
  }

  List<Widget> columnChildren() {
    List<Widget> toReturn = [
      Container(
          margin: EdgeInsets.all(defaultPadding(context)),
          height: height(context) * .2,
          width: width(context) * .92,
          child: Stack(
            fit: StackFit.expand,
            children: [
              ImageWidget(
                key: syncedFile.key,
                width: width(context) * .92,
                height: height(context) * .2,
                borderRadius: BorderRadius.circular(8),
                imageFile: syncedFile,
              ),
              Positioned(
                  right: defaultPadding(context),
                  bottom: defaultPadding(context),
                  child: CustomIconButton(updatePic, MdiIcons.camera,
                      Size(width(context) * .1, width(context) * .1), true))
            ],
          )),
      Container(
          margin: EdgeInsets.only(
              left: defaultPadding(context), right: defaultPadding(context)),
          child: TextFormField(
            enabled: create,
            controller: nameEditingController,
            decoration: InputDecoration(
                prefixIcon: const Icon(FontAwesomeIcons.user),
                labelText: strings.organization_view_entity_name),
            textInputAction: TextInputAction.next,
            enableSuggestions: true,
            validator: (value) => (value ?? "").isEmpty
                ? strings.organization_view_entity_enter_name
                : null,
          )),
      Container(
          margin: EdgeInsets.only(
              top: defaultPadding(context),
              left: defaultPadding(context),
              right: defaultPadding(context)),
          child: TextFormField(
            enabled: create,
            controller: descriptionEditingController,
            decoration: InputDecoration(
                prefixIcon: const Icon(MdiIcons.pen),
                labelText: strings.organization_view_entity_description),
            textInputAction: TextInputAction.next,
            enableSuggestions: true,
            validator: (value) => (value ?? "").isEmpty
                ? strings.organization_view_entity_enter_description
                : null,
          ))
    ];
    toReturn.addAll(List.generate(
        widget.level.customData.length, (index) => customDataField(index)));
    return toReturn;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        bottom: false,
        top: false,
        child: Scaffold(
            backgroundColor: Theme.of(context).colorScheme.background,
            body: Padding(
                padding: EdgeInsets.only(
                    bottom: MediaQuery.of(context).padding.bottom <
                            defaultPadding(context)
                        ? defaultPadding(context)
                        : MediaQuery.of(context).padding.bottom),
                child: Container(
                  child: Column(
                    children: [
                      Container(
                          height: height(context) * .1,
                          width: width(context),
                          child: Row(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Container(
                                    alignment: Alignment.center,
                                    margin: EdgeInsets.symmetric(
                                        vertical: defaultPadding(context)),
                                    child: CommonWidgets.defaultBackwardButton(
                                        padding: EdgeInsets.symmetric(
                                            horizontal:
                                                defaultPadding(context)),
                                        context: context,
                                        goBack: () =>
                                            Navigator.of(context).pop())),
                                Expanded(
                                  child: Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      Expanded(
                                          child: Container(
                                              alignment: Alignment.centerLeft,
                                              child: Text(
                                                  strings
                                                      .organization_view_dialog_add_entity,
                                                  style: Theme.of(context)
                                                      .textTheme
                                                      .headline2))),
                                    ],
                                  ),
                                )
                              ])),
                      Expanded(
                          child: Form(
                              key: _formKey,
                              child: Container(
                                  child: Scrollbar(
                                      child: SingleChildScrollView(
                                child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: columnChildren(),
                                ),
                              ))))),
                      Container(
                          margin: EdgeInsets.all(defaultPadding(context)),
                          child: ElevatedButton(
                              style: ButtonStyle(
                                textStyle: MaterialStateProperty.all(
                                    TextStyle(fontSize: 18)),
                                shape: MaterialStateProperty.all(
                                    RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(8))),
                                minimumSize: MaterialStateProperty.all(Size(
                                    width(context) * .92,
                                    width(context) * .12)),
                                backgroundColor: MaterialStateProperty.all(
                                    Theme.of(context)
                                        .colorScheme
                                        .secondary), //todo: change
                              ),
                              onPressed: save,
                              child: Center(
                                  child: Container(
                                      child: Text(
                                          create
                                              ? strings
                                                  .organization_view_entity_save_entity
                                              : strings
                                                  .organization_view_entity_save_changes,
                                          style: TextStyle(
                                              fontSize: 18,
                                              color: Theme.of(context)
                                                  .colorScheme
                                                  .onSecondary))))))
                    ],
                  ),
                ))));
  }
}

class ListWidget extends StatelessWidget {
  ListWidget({required Key key}) : super(key: key);
  final ScrollController _scrollController = ScrollController();

  Widget listItem(BuildContext buildContext, int index,
      EntitiesLoadedOrganizationViewState state, bool showdetailspossible) {
    String parentEntityName = state.levelContentList.last.parentEntity != null
        ? state.levelContentList.last.parentEntity!.displayName
        : "";
    List<Entity> entities = state.currentLevelContent.daughterEntities;

    SyncedFile imageFile =
        EntityRepository.instance.getEntityPic(entities[index]);
    return Card(
        margin: EdgeInsets.symmetric(
            horizontal: defaultPadding(buildContext),
            vertical: defaultPadding(buildContext) / 2),
        child: Container(
            child: Stack(
          fit: StackFit.passthrough,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                ImageWidget(
                  imageFile: imageFile,
                  key: imageFile.key,
                  width: width(buildContext) - defaultPadding(buildContext) * 2,
                  height: height(buildContext) * .2,
                  borderRadius: BorderRadius.vertical(top: Radius.circular(8)),
                ),
                Container(
                  padding: EdgeInsets.only(
                      left: defaultPadding(buildContext),
                      right: defaultPadding(buildContext),
                      top: defaultPadding(buildContext),
                      bottom: parentEntityName == ""
                          ? defaultPadding(buildContext)
                          : 0),
                  child: Text(entities[index].displayName,
                      style: Theme.of(buildContext).textTheme.headline2),
                ),
                if (parentEntityName != "")
                  Container(
                    padding: EdgeInsets.only(
                        left: defaultPadding(buildContext),
                        right: defaultPadding(buildContext),
                        top: defaultPadding(buildContext),
                        bottom: defaultPadding(buildContext)),
                    child: Text(parentEntityName,
                        style: Theme.of(buildContext).textTheme.subtitle2),
                  ),
                if (state.addChildPossible(entities[index]))
                  Container(
                    child: ElevatedButton(
                        style: ButtonStyle(
                          textStyle: MaterialStateProperty.all(
                              TextStyle(fontSize: 18)),
                          shape: MaterialStateProperty.all(
                              RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8))),
                          minimumSize: MaterialStateProperty.all(Size(
                              width(buildContext) * .84,
                              width(buildContext) * .12)),
                          backgroundColor: MaterialStateProperty.all(
                              Theme.of(buildContext)
                                  .colorScheme
                                  .secondary), //todo: change
                        ),
                        onPressed: () {
                          buildContext
                              .read<OrganizationViewBloc>()
                              .add(NavigateToDaughterView(entities[index]));
                        },
                        child: Center(
                            child: Icon(FontAwesomeIcons.arrowRight,
                                color: Theme.of(buildContext)
                                    .colorScheme
                                    .onSecondary))),
                    padding: EdgeInsets.only(
                        left: defaultPadding(buildContext),
                        right: defaultPadding(buildContext),
                        bottom: defaultPadding(buildContext)),
                  ),
                
              ],
            ),
            Positioned(
                right: defaultPadding(buildContext),
                top: height(buildContext) * .2 - width(buildContext) * .06,
                child: ElevatedButton(
                  style: ButtonStyle(
                    shape: MaterialStateProperty.all(RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8))),
                    minimumSize: MaterialStateProperty.all(Size(
                        width(buildContext) * .2, width(buildContext) * .12)),
                    backgroundColor: MaterialStateProperty.all(
                        Theme.of(buildContext)
                            .colorScheme
                            .primary), //todo: change
                  ),
                  onPressed: () {
                    buildContext
                        .read<OrganizationViewBloc>()
                        .add(NavigateToEntityOverview(entities[index]));
                  },
                  child: Center(
                      child: Row(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                        Icon(MdiIcons.fileDocument,
                            color:
                                Theme.of(buildContext).colorScheme.onSecondary),
                        SizedBox(
                          width: defaultPadding(buildContext),
                        ),
                        Container(
                            child: Text(strings.organization_view_info_button,
                                style: TextStyle(
                                    fontSize: 18,
                                    color: Theme.of(buildContext)
                                        .colorScheme
                                        .onPrimary)))
                      ])),
                ))
          ],
        )));
  }

  addEntity(BuildContext context) async {
    //todo: implement auto start here
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<OrganizationViewBloc, OrganizationViewState>(
        buildWhen: ((previous, current) =>
            current is EntitiesLoadedOrganizationViewState),
        builder: (context, state) {
          EntitiesLoadedOrganizationViewState
              entitiesLoadedOrganizationViewState =
              state as EntitiesLoadedOrganizationViewState;
          List<Entity> entities = entitiesLoadedOrganizationViewState
              .currentLevelContent.daughterEntities;

          if(entities.isEmpty){
            addEntity(context);
            return Container();
          }

          var appliedInterventionsAllowed =
              entities.first.level.interventionsAreAllowed;

          if (appliedInterventionsAllowed) {
            appliedInterventionsAllowed =
                entities.first.level.allowedInterventions!.isNotEmpty;
          }

          return Container(
              child: Scrollbar(
            controller: _scrollController,
            child: ListView.builder(
                controller: _scrollController,
                itemBuilder: (context, index) {
                  return listItem(
                      context,
                      index,
                      entitiesLoadedOrganizationViewState,
                      appliedInterventionsAllowed);
                },
                itemCount: entities.length),
          ));
        });
  }
}

class OverviewWidget extends StatelessWidget {
  OverviewWidget(
      {Key? key,
      required this.entity,
      required this.onTasksTapped,
      required this.onSurveysTapped,
      required this.onAppliedInterventionsTapped,
      required this.onUpdateEntityTapped})
      : super(key: key);
  ValueChanged<Entity> onTasksTapped;
  ValueChanged<Entity> onSurveysTapped;
  ValueChanged<Entity> onAppliedInterventionsTapped;
  ValueChanged<Entity> onUpdateEntityTapped;
  Entity entity;

  Widget generalCardContent(BuildContext context) {
    print("general card content rebuild");
    SyncedFile syncedFile = EntityRepository.instance.getEntityPic(entity);
    return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          ImageWidget(
            imageFile: syncedFile,
            key: syncedFile.key,
            width: width(context) * .92,
            height: height(context) * .2,
            borderRadius: BorderRadius.vertical(top: Radius.circular(8)),
          ),
          Container(
              margin: EdgeInsets.all(defaultPadding(context)),
              child: Row(children: [
                Expanded(
                    child: Text(strings.organization_view_info,
                        style: Theme.of(context).textTheme.headline2)),
                SizedBox(width: defaultPadding(context)),
                CustomIconButton(
                  () => onUpdateEntityTapped(entity),
                  MdiIcons.pen,
                  Size(width(context) * .1, width(context) * .1),
                  true,
                )
              ])),
          if (entity.displayDescription.isNotEmpty)
            Container(
                margin: EdgeInsets.only(
                    left: defaultPadding(context),
                    right: defaultPadding(context),
                    bottom: defaultPadding(context) / 2),
                child: Text(entity.displayDescription,
                    style: Theme.of(context).textTheme.bodyText1)),
          if (entity.customData.isNotEmpty)
            Container(
                margin: EdgeInsets.only(
                    left: defaultPadding(context),
                    right: defaultPadding(context),
                    bottom: defaultPadding(context) / 2),
                child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: List.generate(
                        entity.customData.length,
                        (index) => Container(
                            margin: EdgeInsets.only(
                                bottom: defaultPadding(context) / 2),
                            child: RichText(
                                text: TextSpan(children: [
                              TextSpan(
                                  text: entity.customData[index].displayName +
                                      ": ",
                                  style: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .copyWith(fontWeight: FontWeight.bold)),
                              TextSpan(
                                  text: entity.customData[index].type ==
                                          CustomDataType.INT
                                      ? (entity.customData[index].intValue ?? 0)
                                          .toString()
                                      : (entity.customData[index].stringValue ??
                                          ""),
                                  style: Theme.of(context).textTheme.bodyText1)
                            ]))))))
        ]);
  }

  Widget taskCardContent(BuildContext context) {
    return BlocBuilder<TaskBloc, TaskState>(builder: (context, state) {
      List<Task> firstThreeTasks = [];

      if (state is LoadedTaskState) {
        firstThreeTasks = state.firstThreeUndoneTasks(entityID: entity.id);
      }

      return Container(
          padding: EdgeInsets.all(defaultPadding(context)),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Container(
                margin: EdgeInsets.only(bottom: defaultPadding(context) / 2),
                child: Text(strings.main_menu_tasks,
                    style: Theme.of(context).textTheme.headline2)),
            if (firstThreeTasks.isNotEmpty)
              Column(
                children: List.generate(
                    firstThreeTasks.length,
                    (index) => taskRow(context, firstThreeTasks[index],
                        checkChangePossible: false,
                        separator: (index != firstThreeTasks.length - 1))),
              ),
            Container(
                margin: EdgeInsets.only(top: defaultPadding(context) / 2),
                child: defaultGreenButton(context, () {
                  if (firstThreeTasks.isNotEmpty) {
                    onTasksTapped(entity);
                  } else {
                    addTask(context, entity: entity);
                  }
                },
                    icon: firstThreeTasks.isNotEmpty
                        ? MdiIcons.arrowRight
                        : MdiIcons.plus,
                    minWidth: width(context) * .84))
          ]));
    });
  }

  Widget surveyCardContent(BuildContext context) {
    List<Survey> firstThreeSurveys = [];
    for (AppliedIntervention appliedIntervention
        in entity.appliedInterventions) {
      for (Survey element in appliedIntervention.intervention.surveys) {
        if (!element.archived) {
          firstThreeSurveys.add(element);
        }
        if (firstThreeSurveys.length >= 3) {
          break;
        }
      }
      if (firstThreeSurveys.length >= 3) {
        break;
      }
    }

    return Container(
        padding: EdgeInsets.all(defaultPadding(context)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
              margin: EdgeInsets.only(bottom: defaultPadding(context) / 2),
              child: Text(strings.organization_view_surveys,
                  style: Theme.of(context).textTheme.headline2)),
          if (firstThreeSurveys.isNotEmpty)
            Column(
              children: List.generate(
                  firstThreeSurveys.length,
                  (index) => surveyRow(context, firstThreeSurveys[index],
                      image: SurveyRepository.instance
                          .getSurveyPic(firstThreeSurveys[index]),
                      separator: index != firstThreeSurveys.length - 1)),
            ),
          Container(
              margin: EdgeInsets.only(top: defaultPadding(context) / 2),
              child: defaultGreenButton(context, () => onSurveysTapped(entity),
                  icon: MdiIcons.arrowRight, minWidth: width(context) * .84))
        ]));
  }

  Widget appliedInterventionCardContent(BuildContext context) {
    List<AppliedIntervention> firstThreeAppliedInterventions =
        entity.appliedInterventions;

    return Container(
        padding: EdgeInsets.all(defaultPadding(context)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
              margin: EdgeInsets.only(bottom: defaultPadding(context) / 2),
              child: Text(strings.organization_view_applied_interventions,
                  style: Theme.of(context).textTheme.headline2)),
          if (firstThreeAppliedInterventions.isNotEmpty)
            Container(
                margin: EdgeInsets.only(
                    bottom: defaultPadding(context) / 2,
                    left: defaultPadding(context),
                    right: defaultPadding(context)),
                child: InterventionFilterWidget(
                    allInterventions: List.generate(
                        firstThreeAppliedInterventions.length,
                        (index) =>
                            firstThreeAppliedInterventions[index].intervention),
                    selectable: false)),
          Container(
              margin: EdgeInsets.only(top: defaultPadding(context) / 2),
              child: defaultGreenButton(context, () async {
                if (firstThreeAppliedInterventions.isEmpty) {
                  AppliedIntervention? aI = await showAppliedInterventionDialog(
                      context,
                      entity,
                      null,
                      context.read<UserBloc>().state.user!);
                  if (aI != null) {
                    context
                        .read<OrganizationViewBloc>()
                        .add(AddAppliedIntervention(entity, aI));
                  } else {
                    context.read<OrganizationViewBloc>().add(UpdatePic());
                  }
                } else {
                  onAppliedInterventionsTapped(entity);
                }
              },
                  icon: firstThreeAppliedInterventions.isEmpty
                      ? MdiIcons.plus
                      : MdiIcons.arrowRight,
                  minWidth: width(context) * .84))
        ]));
  }

  Widget childWidget(BuildContext context, int index) {
    return Card(
        key: ValueKey(key.toString() + index.toString()),
        margin: EdgeInsets.symmetric(
            horizontal: defaultPadding(context),
            vertical: defaultPadding(context) / 2),
        child: index == 0
            ? generalCardContent(context)
            : index == 1
                ? taskCardContent(context)
                : index == 2
                    ? surveyCardContent(context)
                    : appliedInterventionCardContent(context));
  }

  @override
  Widget build(BuildContext context) {
    print("building overview widget");
    print("overview widget key: $key");
    return Scrollbar(
        key: key,
        child: ListView.builder(
            key: key,
            itemBuilder: childWidget,
            itemCount: entity.level.interventionsAreAllowed
                ? (entity.level.allowedInterventions!.isNotEmpty ? 4 : 2)
                : 2,
            addAutomaticKeepAlives: false));
  }
}

class AppliedInterventionOverviewPage extends StatelessWidget {
  const AppliedInterventionOverviewPage({Key? key}) : super(key: key);

  Widget listItem(BuildContext buildContext, int index) {
    List<AppliedIntervention> interventions = (buildContext
            .read<OrganizationViewBloc>()
            .state as EntitiesLoadedOrganizationViewState)
        .currentDetailEntity!
        .appliedInterventions;
    Intervention intervention = interventions[index].intervention;
    return interventionRow(buildContext, intervention,
        image: InterventionRepository.instance.getInterventionPic(intervention),
        separator: interventions.length - 1 != index,
        pressable: true, onPressed: () async {
      buildContext
          .read<OrganizationViewBloc>()
          .add(NavigateToEntityAppliedInterventionDetail(interventions[index]));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
      children: [
        Expanded(
            child: Scrollbar(
                child: ListView.builder(
                    itemBuilder: listItem,
                    itemCount: (context.read<OrganizationViewBloc>().state
                            as EntitiesLoadedOrganizationViewState)
                        .currentDetailEntity!
                        .appliedInterventions
                        .length))),
        Container(
          margin: EdgeInsets.all(
            defaultPadding(context),
          ),
          child: CommonWidgets.defaultIconButton(
              context: context,
              iconData: MdiIcons.plus,
              fillColor: Theme.of(context).colorScheme.secondary,
              buttonSizes: ButtonSizes.large,
              onPressed: () async {
                User user = context.read<UserBloc>().state.user!;
                Entity entity = (context.read<OrganizationViewBloc>().state
                        as EntitiesLoadedOrganizationViewState)
                    .currentDetailEntity!;
                AppliedIntervention? appliedIntervention =
                    await showAppliedInterventionDialog(
                        context, entity, null, user);
                if (appliedIntervention != null) {
                  context
                      .read<OrganizationViewBloc>()
                      .add(AddAppliedIntervention(entity, appliedIntervention));
                } else {
                  context.read<OrganizationViewBloc>().add(UpdatePic());
                }
              }),
        )
      ],
    ));
  }
}

class AppliedInterventionPage extends StatefulWidget {
  const AppliedInterventionPage({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return AppliedInterventionPageState();
  }
}

class AppliedInterventionPageState extends State<AppliedInterventionPage> {
  late AppliedIntervention appliedIntervention;
  late Entity entity;

  late SyncedFile imageFileSynced;

  updatePic() async {
    XFile r = await CameraFunctionality.takePicture(context: context);

    await imageFileSynced.updateAsPic(r);
    setState(() {});
  }

  void updateState(bool? okay) async {
    setState(() {
      appliedIntervention.isOkay = okay ?? false;
    });
    context
        .read<OrganizationViewBloc>()
        .add(UpdateAppliedIntervention(entity, appliedIntervention));
  }

  @override
  void initState() {
    appliedIntervention = (context.read<OrganizationViewBloc>().state
            as EntitiesLoadedOrganizationViewState)
        .currentDetailAppliedIntervention!;
    entity = (context.read<OrganizationViewBloc>().state
            as EntitiesLoadedOrganizationViewState)
        .currentDetailEntity!;
    imageFileSynced = AppliedInterventionRepository.instance
        .appliedInterventionPic(appliedIntervention);
    imageFileSynced.file().then((value) {
      try {
        setState(() {});
      } catch (e) {}
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    List<Survey> nonArchivedSurveys = List.from(appliedIntervention
        .intervention.surveys
        .where((element) => !element.archived));

    return Align(alignment: Alignment.topCenter, child: Scrollbar(
        child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Card(
          margin: EdgeInsets.all(defaultPadding(context)),
          child: Container(
              height: height(context) * .3,
              width: width(context) * .92,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  ImageWidget(
                      imageFile: imageFileSynced,
                      key: imageFileSynced.key,
                      width: width(context) * .92,
                      height: height(context) * .3,
                      borderRadius: BorderRadius.circular(8)),
                  Positioned(
                      right: defaultPadding(context),
                      bottom: defaultPadding(context),
                      child: CustomIconButton(
                          updatePic,
                          MdiIcons.camera,
                          Size(width(context) * .15, width(context) * .15),
                          true))
                ],
              )),
        ),

        // HIDDEN AS IT IS NOT STABLE
        /*if (appliedIntervention.intervention.interventionType ==
            InterventionType.TECHNOLOGY)
          Card(
              margin: EdgeInsets.symmetric(horizontal: defaultPadding(context)),
              child: Container(
                  padding: EdgeInsets.all(defaultPadding(context)),
                  child: Column(
                      children: [
                        Container(
                            margin: EdgeInsets.only(
                                bottom: defaultPadding(context)),
                            child: Text(
                                strings
                                    .organization_view_appliedintervention_detail_techonology_working,
                                style: Theme.of(context).textTheme.headline2)),
                        RadioListTile(
                            value: true,
                            groupValue: appliedIntervention.isOkay,
                            onChanged: updateState,
                            title: Text(strings.yes,
                                style: Theme.of(context).textTheme.bodyText1)),
                        RadioListTile(
                            value: false,
                            groupValue: appliedIntervention.isOkay,
                            onChanged: updateState,
                            title: Text(strings.no,
                                style: Theme.of(context).textTheme.bodyText1))
                      ],
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min))),*/
        if (nonArchivedSurveys.isNotEmpty)
          Card(
              margin: EdgeInsets.all(defaultPadding(context)),
              child: Container(
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: List.generate(
                          nonArchivedSurveys.length + 1,
                          (index) => index == 0
                              ? Container(
                                  margin:
                                      EdgeInsets.all(defaultPadding(context)),
                                  child: Text(strings.organization_view_surveys,
                                      style: Theme.of(context)
                                          .textTheme
                                          .headline2))
                              : surveyRow(
                                  context,
                                  nonArchivedSurveys[index - 1],
                                  image: SurveyRepository.instance.getSurveyPic(
                                      nonArchivedSurveys[index - 1]),
                                  pressable: true,
                                  onPressed: () {
                                    context.read<OrganizationViewBloc>().add(
                                        StartSurvey(
                                            nonArchivedSurveys[index - 1],
                                            appliedIntervention,
                                            (context
                                                        .read<
                                                            OrganizationViewBloc>()
                                                        .state
                                                    as EntitiesLoadedOrganizationViewState)
                                                .currentDetailEntity!));
                                  },
                                )))))
      ],
    ))));
  }
}

Future<AppliedIntervention?> showAppliedInterventionDialog(
    BuildContext buildContext,
    Entity entity,
    AppliedIntervention? appliedIntervention,
    User user) async {
  return showDialog(
      barrierColor: Theme.of(buildContext).colorScheme.background,
      context: buildContext,
      builder: (context) {
        return AppliedInterventionDialog(
            entity, appliedIntervention, buildContext, user);
      });
}

class AppliedInterventionDialog extends StatefulWidget {
  Entity entity;

  AppliedIntervention? appliedIntervention;
  BuildContext buildContext;
  User user;

  AppliedInterventionDialog(
      this.entity, this.appliedIntervention, this.buildContext, this.user);

  @override
  State<StatefulWidget> createState() {
    return AppliedInterventionDialogState();
  }
}

class AppliedInterventionDialogState extends State<AppliedInterventionDialog> {
  final _formKey = GlobalKey<FormState>();

  bool create = true;
  AppliedIntervention? _appliedIntervention;
  Intervention? intervention;

  SyncedFile? syncedFile;

  List<Intervention>? interventions;

  bool loaded = false;

  AppliedIntervention? get appliedIntervention => _appliedIntervention;

  set appliedIntervention(AppliedIntervention? appliedIntervention) {
    _appliedIntervention = appliedIntervention;
    syncedFile = AppliedInterventionRepository.instance
        .appliedInterventionPic(appliedIntervention!);
  }

  updatePic() async {
    XFile r = await CameraFunctionality.takePicture(context: context);
    if (appliedIntervention != null) {
      syncedFile ??= AppliedInterventionRepository.instance
          .appliedInterventionPic(appliedIntervention!);
      await syncedFile!.updateAsPic(r);
      setState(() {});
    }
  }

  void setStateIfMounted(Function function) {
    if (mounted) {
      setState(() {
        function();
      });
    } else {
      function();
    }
  }

  @override
  void initState() {
    if (widget.appliedIntervention != null) {
      create = false;
      appliedIntervention = widget.appliedIntervention;
      syncedFile = AppliedInterventionRepository.instance
          .appliedInterventionPic(appliedIntervention!);
    }
    super.initState();
    if (widget.appliedIntervention == null) {
      InterventionRepository.instance
          .getInterventionsByLevelConnections(
              widget.entity.level.allowedInterventions!)
          .then((value) => setState(() {
                interventions = value;
                loaded = true;
              }));
    }
  }

  Widget interventionItem(BuildContext buildContext, int index) {
    //todo: implement localization
    return interventionRow(context, interventions![index],
        separator: (index != interventions!.length - 1),
        image: InterventionRepository.instance
            .getInterventionPic(interventions![index]),
        pressable: true, onPressed: () {
      AppliedIntervention toCreate = AppliedIntervention(
          id: UUID.getUUID(),
          appliedInterventionWhoDidItId: widget.user.id,
          entityAppliedInterventionsId: widget.entity.id,
          appliedInterventionInterventionId: interventions![index].id,
          isOkay: true)
        ..intervention = interventions![index]
        ..whoDidIt = widget.user
        ..entity = widget.entity;
      setState(() {
        appliedIntervention = toCreate;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        bottom: false,
        top: false,
        child: Scaffold(
            backgroundColor: Theme.of(context).colorScheme.background,
            body: Padding(
                padding: EdgeInsets.only(
                    bottom: MediaQuery.of(context).padding.bottom <
                            defaultPadding(context)
                        ? defaultPadding(context)
                        : MediaQuery.of(context).padding.bottom),
                child: Column(children: [
                  Flexible(
                    child: Container(
                        height: height(context) * .1,
                        width: width(context),
                        child: Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Container(
                                  alignment: Alignment.center,
                                  margin: EdgeInsets.symmetric(
                                      vertical: defaultPadding(context)),
                                  child: CommonWidgets.defaultBackwardButton(
                                      padding: EdgeInsets.symmetric(
                                          horizontal: defaultPadding(context)),
                                      context: context,
                                      goBack: () => Navigator.of(context)
                                          .pop(appliedIntervention))),
                              Expanded(
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Expanded(
                                        child: Container(
                                            alignment: Alignment.centerLeft,
                                            child: Text(
                                                widget.appliedIntervention ==
                                                        null
                                                    ? strings
                                                        .organization_view_dialog_add_appliedintervention
                                                    : strings
                                                        .organization_view_dialog_update_appliedintervention,
                                                style: Theme.of(context)
                                                    .textTheme
                                                    .headline2))),
                                  ],
                                ),
                              )
                            ])),
                  ),
                  !loaded
                      ? Center(child: loadingSign(context))
                      : appliedIntervention == null
                          ? Container(
                              height: height(context) * .8,
                              child: Scrollbar(
                                  child: ListView.builder(
                                      itemBuilder: interventionItem,
                                      itemCount: interventions!.length,
                                      shrinkWrap: false)))
                          : Container(
                              child: Column(
                              children: [
                                Card(
                                  margin:
                                      EdgeInsets.all(defaultPadding(context)),
                                  child: Container(
                                      height: height(context) * .3,
                                      width: width(context) * .92,
                                      child: Stack(
                                        fit: StackFit.expand,
                                        children: [
                                          ImageWidget(
                                              width: width(context) * .92,
                                              height: height(context) * .3,
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                              imageFile: syncedFile,
                                              key: syncedFile!.key),
                                          Positioned(
                                              right: defaultPadding(context),
                                              bottom: defaultPadding(context),
                                              child: CustomIconButton(
                                                  updatePic,
                                                  MdiIcons.camera,
                                                  Size(width(context) * .15,
                                                      width(context) * .15),
                                                  true))
                                        ],
                                      )),
                                ),
                                Container(
                                    margin:
                                        EdgeInsets.all(defaultPadding(context)),
                                    child: defaultGreenButton(
                                        context,
                                        () => Navigator.of(context)
                                            .pop(appliedIntervention),
                                        text: strings
                                            .organization_view_entity_save_entity,
                                        minWidth: width(context) * .92))
                              ],
                            ))
                ]))));
  }
}

class SurveyWidget extends StatefulWidget {
  const SurveyWidget({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return SurveyWidgetState();
  }
}

class SurveyWidgetState extends State<SurveyWidget> {
  late Entity entity;
  late List<Map<String, dynamic>> currentlyDisplayedSurveys;
  late List<Intervention> currentlySelectedInterventions;

  void updateCurrentlySelectedInterventions(List<Intervention> selected) {
    if (selected.isEmpty) {
      List<Map<String, dynamic>> toSet = [];
      entity.appliedInterventions.forEach((element) {
        for (Survey survey in element.intervention.surveys) {
          toSet.add({"appliedIntervention": element, "survey": survey});
        }
      });
      setState(() {
        currentlyDisplayedSurveys = toSet;
      });
    } else {
      List<Map<String, dynamic>> toSet = [];
      entity.appliedInterventions.forEach((element) {
        if (selected.any((obj) => obj.id == element.intervention.id)) {
          for (Survey survey in element.intervention.surveys) {
            if (!survey.archived) {
              toSet.add({"appliedIntervention": element, "survey": survey});
            }
          }
        }
      });
      setState(() {
        currentlyDisplayedSurveys = toSet;
      });
    }
  }

  @override
  void initState() {
    EntitiesLoadedOrganizationViewState state = context
        .read<OrganizationViewBloc>()
        .state as EntitiesLoadedOrganizationViewState;
    entity = state.currentDetailEntity!;
    currentlySelectedInterventions = [];
    currentlyDisplayedSurveys = [];
    for (var element in entity.appliedInterventions) {
      for (Survey survey in element.intervention.surveys) {
        if (!survey.archived) {
          currentlyDisplayedSurveys
              .add({"appliedIntervention": element, "survey": survey});
        }
      }
    }
    super.initState();
  }

  Widget listItem(BuildContext buildContext, int i) {
    return surveyRow(context, currentlyDisplayedSurveys[i]["survey"],
        image: SurveyRepository.instance
            .getSurveyPic(currentlyDisplayedSurveys[i]["survey"]),
        pressable: true, onPressed: () {
      buildContext.read<OrganizationViewBloc>().add(StartSurvey(
          currentlyDisplayedSurveys[i]["survey"],
          currentlyDisplayedSurveys[i]["appliedIntervention"],
          (buildContext.read<OrganizationViewBloc>().state
                  as EntitiesLoadedOrganizationViewState)
              .currentDetailEntity!));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
            margin: EdgeInsets.all(defaultPadding(context)),
            child: InterventionFilterWidget(
              allInterventions: List.generate(
                  entity.appliedInterventions.length,
                  (i) => entity.appliedInterventions[i].intervention),
              selectable: true,
              onSelectionChanged: (newList) =>
                  updateCurrentlySelectedInterventions(newList),
            )),
        Expanded(
            child: Scrollbar(
                child: ListView.builder(
                    itemBuilder: listItem,
                    itemCount: currentlyDisplayedSurveys.length)))
      ],
    );
  }
}

class ExecutedSurveyHistory extends StatelessWidget {
  const ExecutedSurveyHistory({Key? key, required this.entity})
      : super(key: key);
  final Entity entity;

  @override
  Widget build(BuildContext context) {
    List<ExecutedSurvey> executedSurveys = entity.executedSurveysDescending();
    return Container(
        child: Scrollbar(
            child: ListView.builder(
                itemBuilder: (context, index) {
                  return executedSurveyRow(context, executedSurveys[index],
                      () async {
                    context
                        .read<OrganizationViewBloc>()
                        .add(NavigateToExecutedSurvey(executedSurveys[index]));
                  });
                },
                itemCount: executedSurveys.length)));
  }
}

class ExecutedSurveyWidget extends StatelessWidget {
  final ExecutedSurvey executedSurvey;

  Map<Question, QuestionAnswer> mappedAnswers = {};
  Map<String, SyncedFile> syncedFileMap = {};

  ExecutedSurveyWidget(this.executedSurvey) {
    for (Question question in executedSurvey.survey.questions) {
      var answers = executedSurvey.answers
          .where((element) => element.questionID == question.id);
      QuestionAnswer? answer = answers.length > 0 ? answers.first : null;
      if (answer != null) {
        mappedAnswers[question] = answer;
      }
      if (question.type == QuestionType.AUDIO) {
        syncedFileMap[question.id!] = ExecutedSurveyRepository.instance
            .getQuestionAnswerAudio(executedSurvey.appliedIntervention,
                executedSurvey.id!, question);
      } else if (question.type == QuestionType.PICTURE) {
        syncedFileMap[question.id!] = ExecutedSurveyRepository.instance
            .getQuestionAnswerPic(executedSurvey.appliedIntervention,
                executedSurvey.id!, question);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return surveyarea.SurveyWidgetState.summaryWidget(
      survey: executedSurvey.survey,
      picAndAudioAnswerFiles: syncedFileMap,
      appliedIntervention: executedSurvey.appliedIntervention,
      executedSurveyId: executedSurvey.id!,
      answers: mappedAnswers,
      context: context,
    );
  }
}
