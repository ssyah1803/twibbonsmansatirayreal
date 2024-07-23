const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const uploadInput = document.getElementById('upload');
const downloadButton = document.getElementById('download-btn');
const fileNameDisplay = document.getElementById('file-name');
const frameImg = new Image();
frameImg.src = 'twibbon_mpls.png';

uploadInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    // Display the file name
    fileNameDisplay.textContent = file.name;

    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Calculate the aspect ratio and size the image correctly
            const canvasAspect = canvas.width / canvas.height;
            const imgAspect = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgAspect > canvasAspect) {
                drawWidth = canvas.width;
                drawHeight = drawWidth / imgAspect;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawHeight = canvas.height;
                drawWidth = drawHeight * imgAspect;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            }

            // Draw the uploaded image onto the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            // Draw the frame on top of the uploaded image
            context.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

downloadButton.addEventListener('click', function() {
    // Ensure the frame is drawn on top before downloading
    context.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

    // Trigger the download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'MPLS_SMANSA_TIRAY.png';
    link.click();
});
