
class TaskStatus {
  constructor(status) {
    this.status = status;
    if (status === 1) {
      this.statusText = "Done";
    } else if (status === -1) {
      this.statusText = "To Do";
    } else if (status === 0) {
      this.statusText = "In Progress";
    } else {
      this.statusText = "Deleted";
    }
  }

  static DONE = 1;
  static TO_DO = -1;
  static IN_PROGRESS = 0;
}

module.exports = TaskStatus;
