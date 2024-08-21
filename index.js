// Your code here
// (1) // process involves looking through code/documentation online to adapt something that will work

function createEmployeeRecord([firstName, familyName, title, number]){
    let newRecord = {}
    newRecord.firstName = firstName
    newRecord.familyName = familyName
    newRecord.title = title
    newRecord.payPerHour = number
    newRecord.timeInEvents = []
    newRecord.timeOutEvents = []
    return newRecord
}

function createEmployeeRecords(arrayOfArrays){
    // console.log(arrayOfArrays)
    let newArr = []
    arrayOfArrays.forEach(array => newArr.push(createEmployeeRecord(array)))
    // console.log(newArr)
    return newArr
}

function createTimeInEvent(employeeRecord, dateString){
    // Declare and initialize the keys
    // console.log(employeeRecord, dateString)
    let timeInObject = {};
    // Assign values to the keys
    timeInObject["type"] = "TimeIn"
        timeInObject["date"] = dateString.slice(0, 10)
        timeInObject["hour"] = parseInt(dateString.slice(11, 15))
    
    employeeRecord["timeInEvents"].push(timeInObject)
    // console.log(employeeRecord)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateString){
    // Declare and initialize the keys
    // console.log(employeeRecord, dateString)
    let timeOutObject = {};
    // Assign values to the keys
    timeOutObject["type"] = "TimeOut"
        timeOutObject["date"] = dateString.slice(0, 10)
        timeOutObject["hour"] = parseInt(dateString.slice(11, 15))
    
    employeeRecord["timeOutEvents"].push(timeOutObject)
    // console.log(employeeRecord)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateString){
    let timeIn = employeeRecord["timeInEvents"].find((element) => {
        return element.date === dateString
    })
    // console.log(timeIn)
    
    let timeOut = employeeRecord["timeOutEvents"].find((element) => {
        return element.date === dateString
    })
    // console.log(timeOut)

    let hoursWorked = timeOut["hour"] - timeIn["hour"]
    return hoursWorked / 100
}

function wagesEarnedOnDate(employeeRecord, dateString) {
    let payOwed = hoursWorkedOnDate(employeeRecord, dateString) * employeeRecord.payPerHour
    console.log(payOwed)
    return payOwed
}

function allWagesFor(employeeRecord){
    let allDatesWorked = employeeRecord["timeInEvents"].map((eachEventObject) => {
        return eachEventObject.date
    })
    let allPay = allDatesWorked.map((eachDate) => {
        return wagesEarnedOnDate(employeeRecord, eachDate)
    })
    console.log(allPay)
    return allPay.reduce(
        (accumulator, currentValue) => { return accumulator + currentValue
    }, 0)
    // wagesEarnedOnDate(employeeRecord, dateString)
}

function calculatePayroll(employeeRecords){
    let allPayRoll = employeeRecords.map((employeeRecord) => {
        return allWagesFor(employeeRecord)
    })
    console.log(allPayRoll)
    let total = allPayRoll.reduce(
        (accumulator, currentValue) => {return accumulator + currentValue}, 0)
        return total
}




let jim = createEmployeeRecord(["Jim", "Jones", "DipSet", 100])
createTimeInEvent(jim, "0044-03-14 0900")
createTimeInEvent(jim, "0044-03-15 0900")
createTimeInEvent(jim, "0044-03-16 0900")
createTimeInEvent(jim, "0044-03-17 0900")
createTimeInEvent(jim, "0044-03-18 0900")

createTimeOutEvent(jim, "0044-03-14 1700")
createTimeOutEvent(jim, "0044-03-15 1700")
createTimeOutEvent(jim, "0044-03-16 1500")
createTimeOutEvent(jim, "0044-03-17 1700")
createTimeOutEvent(jim, "0044-03-18 1700")
