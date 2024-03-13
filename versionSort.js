const target = ['1.0.0', '0.2.0', '0.1.0', '0.0.3', '0.0.1', '1.1.0']

const mySort = arr => {
  return arr.sort((a, b) => {
    console.log("a", a, 'b', b);
    const versionsA = a.split('.');
    const versionsB = b.split('.');
    const majorA = versionsA[0];
    const minorA = versionsA[1];
    const patchA = versionsA[2];

    const majorB = versionsB[0];
    const minorB = versionsB[1];
    const patchB = versionsB[2];
    if (majorA > majorB) {
      return 1;
    } else if (majorA === majorB) {
      return 0;
    } else {
        if (minorA > minorB) {
          return 1;
        } else if (minorA === minorB) {
          return 0;
        } else {
          if (patchA > patchB) {
            return 1;
          } else if (patchA === patchB) {
            return 0;
          } else {
            return -1;
          }
        }
    }

  
  })
}

console.log(mySort(target));