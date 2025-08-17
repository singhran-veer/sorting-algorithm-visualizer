const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
};

const defaultCompare = (a, b) => {
  if (a === b) return 0;
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
};

class SortingAlgorithms {
  bubbleSort(array) {
    const swaps = [];
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        swaps.push({firstPosition:j,lastPosition:j+1,type:'compare'});
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swaps.push({ 
            firstPosition: j, 
            lastPosition: j + 1,
            type: 'swap'
          });
        }
      }
    }
    return swaps;
  }

  selectionSort(array) {
    const swaps = [];
    const n = array.length;
    
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      
      for (let j = i + 1; j < n; j++) {
        swaps.push({
          firstPosition: j,
          lastPosition: minIndex,
          type: 'compare'
        });
        
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        swaps.push({
          firstPosition: i,
          lastPosition: minIndex,
          type: 'swap'
        });
      }
    }
    return swaps;
  }

  quickSort(array, compareFn = defaultCompare) {
    const swaps = [];

    const partition = (arr, s, e) => {
      const pivot = arr[s];
      let cnt = 0;

   
      for (let i = s + 1; i <= e; i++) {
        swaps.push({
          firstPosition: i,
          lastPosition: s,
          type: 'compare'
        });
        if (compareFn(arr[i], pivot) !== Compare.BIGGER_THAN) {
          cnt++;
        }
      }

    
      const pivotIndex = s + cnt;
      [arr[pivotIndex], arr[s]] = [arr[s], arr[pivotIndex]];
      if (pivotIndex !== s) {
        swaps.push({
          firstPosition: pivotIndex,
          lastPosition: s,
          type: 'swap'
        });
      }

      
      let i = s, j = e;
      while (i < pivotIndex && j > pivotIndex) {
        while (compareFn(arr[i], pivot) !== Compare.BIGGER_THAN) {
          i++;
        }
        while (compareFn(arr[j], pivot) === Compare.BIGGER_THAN) {
          j--;
        }
        if (i < pivotIndex && j > pivotIndex) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps.push({
            firstPosition: i,
            lastPosition: j,
            type: 'swap'
          });
          i++;
          j--;
        }
      }

      return pivotIndex;
    };

    const quickSortHelper = (arr, s, e) => {
      if (s >= e) return;
      const p = partition(arr, s, e);
      quickSortHelper(arr, s, p - 1);
      quickSortHelper(arr, p + 1, e);
    };

    quickSortHelper(array, 0, array.length - 1);
    return swaps;
  }

  mergeSort(array) {
    const swaps = [];
    const auxiliaryArray = array.slice();
    
    const merge = (mainArray, startIdx, midIdx, endIdx, auxiliaryArray) => {
      let k = startIdx;
      let i = startIdx;
      let j = midIdx + 1;
      
      while (i <= midIdx && j <= endIdx) {
        swaps.push({
          firstPosition: i,
          lastPosition: j,
          type: 'compare'
        });
        if (auxiliaryArray[i] < auxiliaryArray[j]) {
          swaps.push({
            firstPosition: k,
            value: auxiliaryArray[i],
            type: 'overwrite'
          });
          mainArray[k++] = auxiliaryArray[i++];
        } else {
          swaps.push({
            firstPosition: k,
            value: auxiliaryArray[j],
            type: 'overwrite'
          });
          mainArray[k++] = auxiliaryArray[j++];
        }
      }
      
      while (i <= midIdx) {
        swaps.push({
          firstPosition: k,
          value: auxiliaryArray[i],
          type: 'overwrite'
        });
        mainArray[k++] = auxiliaryArray[i++];
      }
      
      while (j <= endIdx) {
        swaps.push({
          firstPosition: k,
          value: auxiliaryArray[j],
          type: 'overwrite'
        });
        mainArray[k++] = auxiliaryArray[j++];
      }
    };
    
    const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray) => {
      if (startIdx === endIdx) return;
      const midIdx = Math.floor((startIdx + endIdx) / 2);
      mergeSortHelper(auxiliaryArray, startIdx, midIdx, mainArray);
      mergeSortHelper(auxiliaryArray, midIdx + 1, endIdx, mainArray);
      merge(mainArray, startIdx, midIdx, endIdx, auxiliaryArray);
    };
    
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);
    return swaps;
  }
}

export { SortingAlgorithms };
