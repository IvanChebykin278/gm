const merge = (arrFirst, arrSecond, axis) => (c = false) => {
    const arrSort = [];
    let i = 0, j = 0;
    // сравниваем два массива, поочередно сдвигая указатели
    while (i < arrFirst.length && j < arrSecond.length) {
        if(!c) {
            arrSort.push(
                (arrFirst[i][axis] < arrSecond[j][axis]) ?
                    arrFirst[i++] : arrSecond[j++]
            );
        } else {
            if(arrFirst[i][axis] < arrSecond[j][axis]) {
                arrSort.push(arrFirst[i++]);
                continue;
            }

            if(arrFirst[i][axis] === arrSecond[j][axis]) {
                arrSort.push(
                    (arrFirst[i][c] < arrSecond[j][c]) ?
                        arrFirst[i++] : arrSecond[j++]
                );
                continue;
            }

            arrSort.push(arrSecond[j++]);
        }
    }
    // обрабатываем последний элемент при разной длине массивов
    // и возвращаем один отсортированный массив
    return [
        ...arrSort,
        ...arrFirst.slice(i),
        ...arrSecond.slice(j)
    ];
};

const mergeSort = (arr, axis, c = false) => {
    // Проверяем корректность переданных данных
    if (!arr || !arr.length) {
        return null;
    }
    //Если массив содержит один элемент просто возвращаем его
    if (arr.length <= 1) {
        return arr;
    }
    // Находим середину массива и делим его на два
    const middle = Math.floor(arr.length / 2);
    const arrLeft = arr.slice(0, middle);
    const arrRight = arr.slice(middle);
    // Для новых массивов снова вызываем сортировку,
    // сливаем их и возвращаем снова единый массив
    return merge(mergeSort(arrLeft, axis), mergeSort(arrRight, axis), axis)(c);
};

export default mergeSort;