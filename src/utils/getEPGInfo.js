const getEPGInfo = (shows = []) => {
    if (!shows || shows.length < 1) return

    for (let i = 0; i < shows.length; i++) {
        let element = shows[i];
        let sDate = element.start
        let eDate = element.end
        let cDate = Date.now()

        sDate = new Date(sDate).getTime()
        eDate = new Date(eDate).getTime()

        let formattedSDate = new Date(element.start).toString().substring(16, 21)
        let formattedEDate = new Date(element.end).toString().substring(16, 21)

        if ((cDate <= eDate && cDate >= sDate))
            // valid = true
            // else valid = false
            return {
                title: element.title,
                start: formattedSDate,
                end: formattedEDate,
            }


    }
    // return valid
}

export default getEPGInfo