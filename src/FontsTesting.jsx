import React from 'react'

export default function FontsTesting() {
  return (
    <div>

      {/* <h1>Testing Image from Public Directory font</h1>
      <img src={`${process.env.PUBLIC_URL}/images/UC.png`} alt="Test Image" />
      <img src={`/images/UC.png`} alt="Test Image" /> */}



      <div className="text-5xl font-bold underline">
        Hello world!
      </div>
      <div className="font-roboto text-5xl font-bold underline">
        Hello world!
      </div>
      <div className="font-poppins text-5xl font-bold underline">
        Hello world!
      </div>
      <div className="font-jameel text-5xl font-bold underline">
        یہ عبارت جمیل نوری نستعلیق میں لکھی گئی ہے۔
      </div>


      <div className="">
        A quick brown fox jumps over the lazy dog. default Poppins Roboto; This text is using the default font.
      </div>
      <div className="font-roboto">
        A quick brown fox jumps over the lazy dog. default Poppins Roboto; This text is using the Roboto font.
      </div>
      <div className="font-poppins">
        A quick brown fox jumps over the lazy dog. default Poppins Roboto; This text is using the Poppins font.
      </div>
      <div className="font-jameel">
        یہ عبارت جمیل نوری نستعلیق میں لکھی گئی ہے۔
      </div>

<table style={{border:'1px solid green', borderCollapse:'collapse', textAlign:'left'}}>
  <tr className="" ><th>Default</th><td style={{border:'1px solid green'}}>ABCDEFGHIJKLMNOPQRSTUVWXYX</td> <td style={{border:'1px solid green'}}>A quick brown fox jumps over the lazy dog. default Poppins Roboto</td></tr>
  <tr className="font-roboto"><th>Roboto</th><td style={{border:'1px solid green'}}>ABCDEFGHIJKLMNOPQRSTUVWXYX</td> <td style={{border:'1px solid green'}}>A quick brown fox jumps over the lazy dog. default Poppins Roboto</td></tr>
  <tr className="font-poppins"><th>Poppins</th><td style={{border:'1px solid green'}}>ABCDEFGHIJKLMNOPQRSTUVWXYX</td> <td style={{border:'1px solid green'}}>A quick brown fox jumps over the lazy dog. default Poppins Roboto</td></tr>
</table>

<table style={{border:'1px solid green', borderCollapse:'collapse', textAlign:'left'}}>
  <tr className="text-5xl" ><th>Default</th><td style={{border:'1px solid green'}}>ABCDEFGHIJKLMNOPQRSTUVWXYX</td> </tr>
  <tr className="font-roboto text-5xl"><th>Roboto</th><td style={{border:'1px solid green'}}>ABCDEFGHIJKLMNOPQRSTUVWXYX</td> </tr>
  <tr className="font-poppins text-5xl"><th>Poppins</th><td style={{border:'1px solid green'}}>ABCDEFGHIJKLMNOPQRSTUVWXYX</td> </tr>
</table>

<table style={{border:'1px solid green', borderCollapse:'collapse', textAlign:'left'}}>
  <tr ><th>Default</th><td className="text-5xl font-bold " style={{border:'1px solid green'}}>Hello World!</td><td className="text-5xl " style={{border:'1px solid green'}}>Hello World!</td> </tr>
  <tr className="font-roboto "><th>Roboto</th><td className="text-5xl font-bold " style={{border:'1px solid green'}}>Hello World!</td><td className="text-5xl " style={{border:'1px solid green'}}>Hello World!</td> </tr>
  <tr className="font-poppins "><th>Poppins</th><td className="text-5xl font-bold " style={{border:'1px solid green'}}>Hello World!</td><td className="text-5xl " style={{border:'1px solid green'}}>Hello World!</td> </tr>
</table>
      
    </div>
  )
}
