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
    
    const partition = (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        swaps.push({
          firstPosition: j,
          lastPosition: high,
          type: 'compare'
        });
        
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          if (i !== j) {
            swaps.push({
              firstPosition: i,
              lastPosition: j,
              type: 'swap'
            });
          }
        }
      }
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      if (i + 1 !== high) {
        swaps.push({
          firstPosition: i + 1,
          lastPosition: high,
          type: 'swap'
        });
      }
      return i + 1;
    };
    
    const quickSortHelper = (arr, low, high) => {
      if (low < high) {
        const pi = partition(arr, low, high);
        quickSortHelper(arr, low, pi - 1);
        quickSortHelper(arr, pi + 1, high);
      }
    };
    
    quickSortHelper(array, 0, array.length - 1);
    return swaps;
  }

  mergeSort(array, compareFn = defaultCompare) {
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
        
        if (compareFn(auxiliaryArray[i], auxiliaryArray[j]) === Compare.LESS_THAN) {
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