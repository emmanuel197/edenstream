export const processLog = (str, param) => {
    console.log(`%cprocess: ${str}`, "font-size: 15px;color:white;background-color:blue", param || null)
}

export const warnLog = (str, param) => {
    console.log(`%cprocess: ${str}`, "font-size: 15px;color:white;background-color:orange", param || null)
}

export const errorLog = (str, param) => {
    console.log(`%cprocess: ${str}`, "font-size: 15px;color:white;background-color:red", param || null)
}