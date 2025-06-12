const getEPGInfo = (shows = []) => {
    if (!shows || shows.length < 1) return
    console.log("getEPGInfo called with shows:", shows);
    for (let i = 0; i < shows.length; i++) {
        let element = shows[i];
        let sDate = element.start
        let eDate = element.end
        let cDate = Date.now()
        console.log("getEPGInfo: Checking show:", element.title, "Start:", sDate, "End:", eDate, "Current:", cDate);
        sDate = new Date(sDate).getTime()
        eDate = new Date(eDate).getTime()

        let formattedSDate = new Date(element.start).toString().substring(16, 21)
        let formattedEDate = new Date(element.end).toString().substring(16, 21)
        console.log("getEPGInfo: Formatted Start Date:", formattedSDate, "Formatted End Date:", formattedEDate);
        // if ((cDate <= eDate && cDate >= sDate))
            // valid = true
            // else valid = false
            console.log("getEPGInfo: Valid EPG found for show:", element.title, "Start:", formattedSDate, "End:", formattedEDate);
            return {
                title: element.title,
                start: formattedSDate,
                end: formattedEDate,
            }


    }
    // return valid
}

export default getEPGInfo