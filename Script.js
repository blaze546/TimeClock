function latestClock(a, b, c, d) {
    const digits = [a, b, c, d];
    const permutations = getPermutations(digits);
    let latestTime = '0000';
  
    permutations.forEach(permutation => {
      const time = permutation.join('');
      if (isValidTime(time) && time > latestTime) {
        latestTime = time;
      }
    });
  
    // Format the result in 'HH:MM' before returning
    return latestTime.substring(0, 2) + ':' + latestTime.substring(2);
  }
  
  function getPermutations(digits) {
    const result = [];
    const used = Array(4).fill(false);
    generatePermutations(digits, [], used, result);
    return result;
  }
  
  function generatePermutations(digits, currentPermutation, used, result) {
    if (currentPermutation.length === digits.length) {
      result.push([...currentPermutation]);
      return;
    }
  
    for (let i = 0; i < digits.length; i++) {
      if (!used[i]) {
        used[i] = true;
        currentPermutation.push(digits[i]);
        generatePermutations(digits, currentPermutation, used, result);
        currentPermutation.pop();
        used[i] = false;
      }
    }
  }
  
  function isValidTime(time) {
    const hours = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(2), 10);
  
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  }
//better solution

  function latestClock(a, b, c, d) {
  // Generate all possible time combinations
  const times = [
    `${a}${b}:${c}${d}`,
    `${a}${b}:${d}${c}`,
    `${a}${c}:${b}${d}`,
    `${a}${c}:${d}${b}`,
    `${a}${d}:${b}${c}`,
    `${a}${d}:${c}${b}`,
    `${b}${a}:${c}${d}`,
    `${b}${a}:${d}${c}`,
    `${b}${c}:${a}${d}`,
    `${b}${c}:${d}${a}`,
    `${b}${d}:${a}${c}`,
    `${b}${d}:${c}${a}`,
    `${c}${a}:${b}${d}`,
    `${c}${a}:${d}${b}`,
    `${c}${b}:${a}${d}`,
    `${c}${b}:${d}${a}`,
    `${c}${d}:${a}${b}`,
    `${c}${d}:${b}${a}`,
    `${d}${a}:${b}${c}`,
    `${d}${a}:${c}${b}`,
    `${d}${b}:${a}${c}`,
    `${d}${b}:${c}${a}`,
    `${d}${c}:${a}${b}`,
    `${d}${c}:${b}${a}`,
  ];

  // Filter out invalid times (hours >= 24 or minutes >= 60)
  const validTimes = times.filter(el => {
    const test = el.split(":");
    if (test[0] >= 24) return false;
    if (test[1] >= 60) return false;
    return true;
  });

  // Sort valid times in descending order
  validTimes.sort((a, b) =>  (b.split(":")[0] - a.split(":")[0] || b.split(":")[1] - a.split(":")[1]));

  // Return the latest valid time
  return validTimes[0];
}
