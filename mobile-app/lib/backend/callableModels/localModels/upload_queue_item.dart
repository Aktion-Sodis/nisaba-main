class UploadQueueItem {
  final String localPath;
  final String remotePath;
  final dynamic key;

  UploadQueueItem(this.key, this.localPath, this.remotePath);
}
