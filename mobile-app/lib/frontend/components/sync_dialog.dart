import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_bloc.dart';
import 'package:mobile_app/backend/Blocs/sync/sync_state.dart';
import 'package:mobile_app/frontend/dependentsizes.dart';
import 'package:mobile_app/frontend/strings.dart';

import '../../backend/Blocs/sync/sync_events.dart';

//create a custom showdialogOption that shows the sync dialog
void showSyncDialog(BuildContext context) {
  showDialog(
      context: context,
      builder: (context) {
        return SyncOverviewDialog();
      });
}

class SyncOverviewDialog extends StatelessWidget {
  List<Widget> columnChilds(BuildContext context, SyncState syncState) {
    //InSyncState, CannotSyncState, FullySyncedState, PrepareSyncState
    if (syncState is PrepareSyncState) {
      return [Expanded(child: Center(child: Text(syncInPreparation)))];
    }
    List<Widget> toReturn = [];
    if (syncState is CannotSyncState) {
      toReturn.add(Container(
          margin: EdgeInsets.only(bottom: defaultPadding(context) / 2),
          child: Row(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [Container(child: Text(syncInterrupted))])));
    }
    int totalSurveys = 0;
    int syncedSurveys = 0;
    int surveyProgres = 0;
    int totalOtherEntities = 0;
    int syncedOtherEntities = 0;
    int otherEntitiesProgress = 0;
    int surveysFailed = 0;
    int otherEntitiesFailed = 0;
    int surveysFailedSaved = 0;
    int otherEntitiesFailedSaved = 0;
    int surveySaveProgress = 0;
    int otherSaveProgres = 0;
    int totalFiles = 0;
    int loadedFiles = 0;
    int fileProgress = 0;
    if (syncState is InSyncState) {
      totalSurveys = syncState.toSyncSurveys;
      syncedSurveys = syncState.syncedSurveys;
      surveyProgres = syncState.syncProgressSurveys;
      totalOtherEntities = syncState.otherEntities;
      syncedOtherEntities = syncState.syncedOtherEntities;
      otherEntitiesProgress = syncState.syncProgressOtherEntities;
      surveysFailed = syncState.failedSurveys;
      otherEntitiesFailed = syncState.failedOtherEntities;
      surveysFailedSaved = syncState.savedFailedSurveys;
      otherEntitiesFailedSaved = syncState.savedFailedOtherEntities;
      surveySaveProgress = syncState.saveProgress;
      otherSaveProgres = syncState.saveProgress;
      totalFiles = syncState.totalFiles;
      loadedFiles = syncState.loadedFiles;
      fileProgress = syncState.progress;
    } else if (syncState is FullySyncedState) {
      totalSurveys = syncState.syncedSurveys;
      syncedSurveys = syncState.syncedSurveys;
      surveyProgres = 100;
      totalOtherEntities = syncState.syncedOtherEntities;
      syncedOtherEntities = syncState.syncedOtherEntities;
      otherEntitiesProgress = 100;
      surveysFailed = syncState.savedFailedSurveys;
      otherEntitiesFailed = syncState.savedFailedOtherEntities;
      surveysFailedSaved = syncState.savedFailedSurveys;
      otherEntitiesFailedSaved = syncState.savedFailedOtherEntities;
      surveySaveProgress = 100;
      otherSaveProgres = 100;
      totalFiles = syncState.loadedFiles;
      loadedFiles = syncState.loadedFiles;
      fileProgress = 100;
    } else if (syncState is CannotSyncState) {
      totalSurveys = syncState.toSyncSurveys;
      syncedSurveys = syncState.syncedSurveys;
      surveyProgres = syncState.syncProgressSurveys;
      totalOtherEntities = syncState.otherEntities;
      syncedOtherEntities = syncState.syncedOtherEntities;
      otherEntitiesProgress = syncState.syncProgressOtherEntities;
      surveysFailed = syncState.failedSurveys;
      otherEntitiesFailed = syncState.failedOtherEntities;
      surveysFailedSaved = syncState.savedFailedSurveys;
      otherEntitiesFailedSaved = syncState.savedFailedOtherEntities;
      surveySaveProgress = syncState.saveProgress;
      otherSaveProgres = syncState.saveProgress;
      totalFiles = syncState.totalFiles;
      loadedFiles = syncState.loadedFiles;
      fileProgress = syncState.progress;
    }
    toReturn.add(syncColumnWidget(
        context, syncSurveys, syncedSurveys, totalSurveys, surveyProgres));
    toReturn.add(syncColumnWidget(context, syncOtherElements,
        syncedOtherEntities, totalOtherEntities, otherEntitiesProgress));
    toReturn.add(syncColumnWidget(
        context, syncFiles, loadedFiles, totalFiles, fileProgress));
    if (surveysFailed > 0) {
      toReturn.add(syncColumnWidget(context, syncFailedSavedSurveys,
          surveysFailedSaved, surveysFailed, surveySaveProgress));
    }
    if (otherEntitiesFailed > 0) {
      toReturn.add(syncColumnWidget(context, syncFailedOtherElements,
          otherEntitiesFailedSaved, otherEntitiesFailed, otherSaveProgres));
    }
    toReturn.add(Expanded(child: Container()));
    toReturn.add(startSyncButton(context, syncState));
    return toReturn;
  }

  Widget syncColumnWidget(BuildContext context, String syncTypeString,
      int completed, int total, int progress,
      {EdgeInsets? margin}) {
    return Container(
        margin: margin ?? EdgeInsets.only(bottom: defaultPadding(context)),
        child: Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
          //name of category
          Expanded(child: Container(child: Text(syncTypeString))),
          Container(
              margin: EdgeInsets.symmetric(horizontal: defaultPadding(context)),
              child: Text("$completed/$total")),
          progressSymbol(context, progress)
        ]));
  }

  Widget progressSymbol(BuildContext context, int progress) {
    if (progress == 100) {
      return const Icon(
        Icons.check,
        size: 20,
        color: Colors.green,
      );
    } else {
      return Container(
          width: 20,
          height: 20,
          child: CircularProgressIndicator(
              color: Theme.of(context).colorScheme.primary,
              value: (progress / 100).toDouble()));
    }
  }

  Widget alertSymbol(BuildContext context, int total, int progress) {
    if (progress == 100 || total == 0) {
      return const Icon(
        Icons.check,
        size: 20,
        color: Colors.green,
      );
    } else {
      return Container(
          width: 20,
          height: 20,
          child: CircularProgressIndicator(
              color: Theme.of(context).colorScheme.primary,
              value: (progress / 100).toDouble()));
    }
  }

  Widget startSyncButton(BuildContext context, SyncState syncState) {
    if (syncState is InSyncState || syncState is PrepareSyncState) {
      return ElevatedButton(onPressed: null, child: Text(syncButtonInSync));
    }
    return ElevatedButton(
        onPressed: () {
          BlocProvider.of<SyncBloc>(context).add(RetriggerSyncEvent());
        },
        child: Text(syncButtonStart));
  }

  @override
  Widget build(BuildContext context) {
    //get a builder that builds depending on sync bloc
    return Center(
        child: Card(
            child: Container(
      width: width(context) * 0.8,
      height: height(context) * 0.8,
      padding: EdgeInsets.all(defaultPadding(context)),
      child: BlocBuilder<SyncBloc, SyncState>(
        builder: (context, state) {
          return Column(children: columnChilds(context, state));
        },
      ),
    )));
  }
}
