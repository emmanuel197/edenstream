const convertArrayToString = (arr) => {
    let ids = []

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        ids.push(element.id)
    }

    return ids.toString()
}

export default convertArrayToString