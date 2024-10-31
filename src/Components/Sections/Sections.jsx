import React from 'react';

const sections = [
  {
    title: 'CHEDDAR Cheese',
    text: 'This is the detail text for CHEDDAR Cheese',
    image: '/assets/SRD/Items/Cheddarche240928014134883.png',
    detail: 
    <ul className='border rounded-lg overflow-hidden'>
      <li className='py-2 px-3 text-black bg-red-600 text-lg text-center'>Net Weight</li>
      <li className='py-2 px-3 text-white bg-amber-500'>200 grams Packing</li>
      <li className='py-2 px-3 text-white bg-amber-500'>400 grams Packing</li>
      <li className='py-2 px-3 text-white bg-amber-500'>2 kg Block</li>
      </ul>
  },
  {
    title: 'PIZZA CHEDDAR Cheese',
    text: 'This is the detail text for PIZZA CHEDDAR Cheese',
    image: '/assets/SRD/Items/CheddarPiz240928014239104.png',
    detail: 
    <ul className='border rounded-lg overflow-hidden'>
      <li className='py-2 px-3 text-black bg-red-600 text-lg text-center'>Net Weight</li>
      <li className='py-2 px-3 text-white bg-amber-500'>200 grams Packing</li>
      <li className='py-2 px-3 text-white bg-amber-500'>400 grams Packing</li>
      <li className='py-2 px-3 text-white bg-amber-500'>2 kg Block</li>
      </ul>
  },
  {
    title: 'SUPER CHEDDAR Cheese',
    text: 'This is the detail text for SUPER CHEDDAR Cheese',
    image: '/assets/SRD/Items/CheddarSup240928013824195.png',
    detail: 
    <ul className='border rounded-lg overflow-hidden'>
      <li className='py-2 px-3 text-black bg-red-600 text-lg text-center'>Net Weight</li>
      <li className='py-2 px-3 text-white bg-amber-500'>200 grams Packing</li>
      <li className='py-2 px-3 text-white bg-amber-500'>400 grams Packing</li>
      <li className='py-2 px-3 text-white bg-amber-500'>2 kg Block</li>
      </ul>
  },
  {
    title: 'MOZZERALLA Cheese',
    text: 'This is the detail text for MOZZERALLA Cheese',
    image: '/assets/SRD/Items/Mozzeralla240928010725581.png',
    detail: 
    <ul className='border rounded-lg overflow-hidden'>
      <li className='py-2 px-3 text-black bg-red-600 text-lg text-center'>Net Weight</li>
      <li className='py-2 px-3 text-white bg-amber-500'>200 grams Packing</li>
      <li className='py-2 px-3 text-white bg-amber-500'>400 grams Packing</li>
      <li className='py-2 px-3 text-white bg-amber-500'>2 kg Block</li>
      </ul>
  },
  {
    title: 'DESI GHEE',
    text: 'This is the detail text for DESI GHEE',
    image: '/assets/SRD/Items/DesiGhee16240928020041862.png',
    detail: 
    <ul className='border rounded-lg overflow-hidden'>
      <li className='py-2 px-3 text-black bg-red-600 text-lg text-center'>Net Weight</li>
      <li className='py-2 px-3 text-white bg-amber-500'>200 grams Packing</li>
      <li className='py-2 px-3 text-white bg-amber-500'>400 grams Packing</li>
      <li className='py-2 px-3 text-white bg-amber-500'>2 kg Block</li>
      </ul>
  },
  {
    title: 'SHREDDED Cheese',
    text: 'This is the detail text for SHREDDED Cheese',
    image: '/assets/SRD/Items/CheddarShr240928020111149.png',
    detail: 
    <ul className='border rounded-lg overflow-hidden'>
      <li className='py-2 px-3 text-black bg-red-600 text-lg text-center'>Net Weight</li>
      <li className='py-2 px-3 text-white bg-amber-500'>Packing 50/50</li>
      <li className='py-2 px-3 text-white bg-amber-500'>Packing 70/30</li>
      <li className='py-2 px-3 text-white bg-amber-500'>Packing 100/100</li>
      </ul>
  },
];

export default function AlternatingSections() {
  return (
    <div className="container mx-auto my-12 space-y-8">
      {sections.map((section, index) => (
        <div
          key={index}
          className="bg-white border-1 rounded-lg shadow-xl flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0"
        >
          {/* Text Section */}
          <div
            className={`flex flex-col md:flex-row md:w-3/5 p-4 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'
              }`}
          >
            <div className={`p-4 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}  >
              <h2 className="text-4xl font-bold mb-4 font-poppins">{section.title}</h2>
              <p className="text-xl text-gray-700 font-poppins">{section.text}</p>
            </div>
            
            <div className={`mx-auto p-4 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}  >
                {section.detail}
            </div>
          </div>

          {/* Image Section */}
          <div
            className={`md:w-2/5 h-80 bg-gray-200 overflow-hidden rounded ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'
              }`}
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-full object-fill"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
