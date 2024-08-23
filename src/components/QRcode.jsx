import React, { useState } from 'react'


 
export const QRcode = () => {
   const [img, setImg] =useState("")
   const [loading,setLoading]=useState(false)
   const [qrData,setQrData] = useState("https://www.youtube.com/")
   const [qrSize, setQrsize]= useState("150")

  
  
   async  function generateqr(){
    setLoading(true)
    try{
 const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
 setImg(url);
    }
    catch(error){
 console.error("error generating qr code", error);
    }
    finally{
 setLoading(false);
    }
// setImg("images/download.jfif")

 }

function downloadqr(){
      fetch(img).then((response)=>response.blob())
      .then((blob)=>{

         const link=document.createElement("a");
         link.href=URL.createObjectURL(blob)
         link.download="qrcode.png";
         document.body.appendChild(link)
         link.click();
         document.body.removeChild(link)
      })
   }
  
  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>pleace wait...</p>}
        {img && <img src={img}  className='qr-code-image'/>}
  
  

        <div>
        <label htmlFor="datainput" className='input-label'>Data for QR code : </label>
        <input type="text" value={qrData} id='datainput' placeholder='Enter data for QR code ' onChange={(e)=>setQrData(e.target.value)}/>
        <label htmlFor="sizeinput" className='input-label'>Image size (e.g., 150) :</label>
        <input type="text" value={qrSize} id='sizeinput' placeholder="Enter image size" onChange={(e)=>setQrsize(e.target.value)} />

        <button className='generate-button' disabled={loading} onClick={generateqr}>Generate QR Code</button>
        <button className='download-button' onClick={downloadqr}>Download QR code</button>
        <p className='footer'>Disigned by <a href="https://www.youtube.com/">Muniyappan</a></p>
    </div>
    </div>
  )
}


