let borderPreview = document.getElementById("borderPreview").style;
let borderText = document.getElementById("borderText");

let text = [];

function reSize(value, id) {
    if (!value) value = 0;
    switch (id) {
        case "topRight":
            borderPreview.borderTopRightRadius = value + "px";
            text[0] = !value ? "" : `<p>border-top-right-radius: ${value}px;</p>`;
            break;
        case "bottomRight":
            borderPreview.borderBottomRightRadius = value + "px";
            text[1] = !value ? "" : `<p>border-bottom-right-radius: ${value}px;</p>`
            break;
        case "topLeft":
            borderPreview.borderTopLeftRadius = value + "px";
            text[2] = !value ? "" : `<p>border-top-left-radius: ${value}px;</p>`
            break;
        case "bottomLeft":
            borderPreview.borderBottomLeftRadius = value + "px";
            text[3] = !value ? "" : `<p>border-bottom-left-radius: ${value}px;</p>`
            break;
    }
    borderText.innerHTML = text.reduce((acc, cur) => acc + cur);
}