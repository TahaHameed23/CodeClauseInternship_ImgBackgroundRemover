function readURL(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
      reader.onload = function (e) {
      const img = document.getElementById('preview');
      const imgDim = screen.width < 768 ? ['h-46','w-46']: ['h-32','w-32'];
      img.classList.add(imgDim[0], imgDim[1] , 'rounded-md', 'm-2','border', 'border-gray-500')
      img.src = e.target.result;
      const removeBGBTN = document.getElementById('removeBgBtn')
      removeBGBTN.removeAttribute('disabled')
      removeBGBTN.removeAttribute('title')
      console.log(imgDim);
      removeBGBTN.classList.remove('cursor-not-allowed')
      removeBGBTN.classList.add('mt-[-2vh]')
      };
    reader.readAsDataURL(input.files[0]);
  }
}


let imageUrl;
function handleBg(){
  const loadingBtn = createLoadingButton();
  document.getElementById('loading').appendChild(loadingBtn);
  document.getElementById('container').classList.add('lg:mt-[-6vh]', 'lg:pb-12')
  const fileInput= document.getElementById('imageInput');
  const image  = fileInput.files[0];
  const imgName = image.name;
  const formData = new FormData();
  formData.append('image_file',image);
  formData.append('size','auto');
  const apiKey= 'W2n8iaTw9nPN4FHqYbbs7twx'
  fetch('https://api.remove.bg/v1.0/removebg',{
    method:'POST',
    headers:{
      'X-Api-Key':apiKey
    },
    body: formData
  })
  .then(function(response){
      return response.blob();
    })
  .then(function(blob){
    console.log(blob);
    const url = URL.createObjectURL(blob);
    imageUrl = url;
    const result = document.getElementById('preview');
    const downloadBtn = createDownloadButton();
    document.getElementById('container').classList.add('lg:mt-[-6vh]', 'lg:pb-12')
    document.getElementById('loading').replaceChild(downloadBtn,loadingBtn)
    result.src = url;
    const imgDim = screen.width < 768 ? ['h-46','w-46']: ['h-32','w-32'];
    result.classList.add(imgDim[0], imgDim[1] , 'rounded-md', 'm-2','border', 'border-gray-500')
   
  })
  .catch();
}

function downloadFile(){
  let a = document.createElement('a')
  a.href = imageUrl;
  a.download ='image.png';
  a.click();
  document.body.removeChild(a);
}

function createDownloadButton(){
  const downloadButton = document.createElement('button');
  downloadButton.id = 'downloadButton';
  downloadButton.disabled = false;
  downloadButton.type = 'button';
  downloadButton.classList.add('transition' ,'duration-150','my-4', 'lg:mt-[4.75rem]' , 'bg-blue-600', 'text-white', 'p-4', 'rounded-md' ,'hover:bg-blue-700', 'ease-in', 'text-3xl')
  downloadButton.onclick=downloadFile;
  downloadButton.appendChild(document.createTextNode('Download'));
  return downloadButton
  }
function createLoadingButton() {
  const loadingButton = document.createElement('button');
  loadingButton.id = 'loadingButton';
  loadingButton.disabled = true;
  loadingButton.type = 'button';
  loadingButton.classList.add(
    'text-white',
    'cursor-no-drop',
    'bg-blue-700',
    'hover:bg-blue-800',
    'focus:ring-4',
    'focus:ring-blue-300',
    'font-medium',
    'rounded-lg',
    'text-sm',
    'p-6',
    'text-3xl;',
    'lg:text-xl',
    'text-center',
    'my-4',
    'lg:mt-[4.75rem]',
    'dark:bg-blue-600',
    'dark:hover:bg-blue-700',
    'dark:focus:ring-blue-800',
    'inline-flex',
    'items-center'
  );

  const loadingSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  loadingSvg.setAttribute('aria-hidden', 'true');
  loadingSvg.setAttribute('role', 'status');
  loadingSvg.setAttribute('class', 'inline w-4 h-4 mr-3 text-white animate-spin');
  loadingSvg.setAttribute('viewBox', '0 0 100 101');
  loadingSvg.setAttribute('fill', 'none');
  const loadingPath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  loadingPath1.setAttribute('d', 'M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z');
  loadingPath1.setAttribute('fill', '#E5E7EB');
  const loadingPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  loadingPath2.setAttribute('d', 'M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z');
  loadingPath2.setAttribute('fill', 'currentColor');

  loadingSvg.appendChild(loadingPath1);
  loadingSvg.appendChild(loadingPath2);

  loadingButton.appendChild(loadingSvg);
  loadingButton.appendChild(document.createTextNode('Loading...'));

  return loadingButton;
}

