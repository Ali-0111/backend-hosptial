function checkCompletedVaccines(arr) {
  for (const item of arr) {
    if (item.step_status === "pending") {
      return false;
    }
  }
  return true;
}

module.exports = { checkCompletedVaccines };
