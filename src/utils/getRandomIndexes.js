const getRandomIndexes = (vods = []) => {
    const min = 1;
    const max = vods.length;
    const _randomIndexes = []

    for (var i = 1; i < 8; i++) {
        var random = Math.round(Math.random() * (max - min) + min)
        if (!_randomIndexes.includes(random)) _randomIndexes.push(random)
    }

    return _randomIndexes
}

export default getRandomIndexes