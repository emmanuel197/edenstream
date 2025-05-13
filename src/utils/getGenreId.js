const getGenreId = (str) => {
    const _genresToId = {
        'adventure': 1006,
        'romance': 1003,
        'action': 1002,
        'comedy': 1005,
        'crime': 1004,
        'drama': 1001,
        'family': 7034,
    }

    const id = _genresToId[str.toLowerCase()]
    if (!str || !id) return 0
    return id.toString() || 0
}

export default getGenreId