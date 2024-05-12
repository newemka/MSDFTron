const form = document.getElementById('myForm');
const font = document.querySelector('#font');
const filename = document.querySelector('#filename');
const outputPath = document.querySelector('#output-path');
//options

const fontSize = document.querySelector('#FontSize');
const distanceRange = document.querySelector('#DistanceRange');
const texturePadding = document.querySelector('#TexturePadding');
const textureSize = document.querySelector('#TextureSize');
const charedit = document.querySelector('#charedit');
// Assume you have a reference to the HTML element where you want to display the message
const messageElement = document.getElementById('message');
const elemI = document.querySelector("#FeedBack");
const feedbackStyle = 'selected';

let charset; // Declare charset variable outside the scope of the promise chain
let contented;
charsetter.char().then(content => {
    console.log(content);
    charset = content; // Assign content to charset inside the promise chain
    return contented;
}).catch(error => {
    console.error('Error fetching file content:', error);
    charset = ''; // Assign an empty string to charset in case of error
});


function loadFont(e) {
    const file = e.target.files[0];

    /*  if (!isFileFont(file)) {
         console.log('Please select a font');
         return;
     } */

    console.log(file.path + ' loaded');
    form.style.visibility = 'visible';
    filename.innerHTML = font.files[0].path;
    //outputPath.innerHTML = os.homedir();
    //outputPath.innerHTML = path.join(os.homedir(), 'MsdfFonts')
    charedit.innerText = contented;
    elemI.className = feedbackStyle;
    elemI.innerHTML = 'font selected ✓';
}

// send Font data to main
function sendFont(e) {

    e.preventDefault();
    const charsetpathvalue = charset;
    const fontSizeValue = fontSize.value;
    const fontPath = font.files[0].path;
    const distanceRangeValue = distanceRange.value;
    const texturePaddingValue = texturePadding.value;
    const textureSizeValue = [+textureSize.value, +textureSize.value];
    //Send to main using ipcRenderer
    ipcRenderer.send('font:convert', {

        fontPath,
        charset: charsetpathvalue,
        fontSize: fontSizeValue,
        distanceRange: +distanceRangeValue,
        texturePadding: +texturePaddingValue,
        textureSize: textureSizeValue,

    });

};

// Make sure it's a font file
function isFileFont(file) {
    const acceptedFontTypes = ['font/ttf'];
    return file && acceptedFontTypes.includes(file['type']);
}

font.addEventListener("change", loadFont);


const information = document.getElementById('info')
//information.innerText = `This app is using Chrome ${versions.chrome()}, Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
information.innerText = `${charsetter.char()}, Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// Function to log the opt object
function logOpt() {
    console.log('opt updated:', fontSize);
}

// Form submit listener
form.addEventListener('submit', sendFont);

window.indexBridge.somethinghappened((event, feedback, feedbackStyle) => {
    elemI.className = feedbackStyle;
    elemI.innerHTML = feedback;

})
