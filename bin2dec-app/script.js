document.getElementById("btnConvert").onclick = function() {
    let binaryInput = document.getElementById("binaryInput").value
    let decimalOutput = document.getElementById("decimalOutput")
    let messageError = document.getElementById("messageError")
    let result = 0

    for(i = binaryInput.length-1, count = 0; i >= 0; i--, count++) {
        if(binaryInput[i] == 0 || binaryInput[i] == 1) {
            console.log("Number",binaryInput[i],"count",i)
            result += Math.pow(2 * binaryInput[i], count)
        } else {
            console.log(binaryInput[i])
            decimalOutput.value = ""
            messageError.innerHTML = "Binary Number Invalid"
            return
        }
    }
    messageError.innerHTML = ""
    decimalOutput.value = result
    return 
    
}


